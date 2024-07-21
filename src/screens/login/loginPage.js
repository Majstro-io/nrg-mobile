import React from "react";
import { Image } from "react-native";
import loginStyles from "./login.styles";
import { useNavigation } from "@react-navigation/native";
import { Button, FormControl, HStack, Heading, Input, ScrollView, Text, VStack, View } from 'native-base';

import navigationconstants from "../../constants/navigationConstants";
import userService from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/slices/userSlice";
import log from "../../config/logger";
import ErrorModal from "../../components/modals/errorModal";
import userPreferencesService from "../../services/userPreferencesService";
import { setPreferences } from "../../store/slices/userPreferencesSlice";
import { useTheme } from "../../styles/ThemeContext";
import { HttpStatusCode } from "axios";
import InputModal from "../../components/modals/InputModal";
import authService from "../../services/authService";

const LoginPage = () => {
    const navigation = useNavigation();
    const { setTheme } = useTheme();

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.data);

    const [mobile, setMobile] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isOtpModalLoading, setIsOtpModalLoading] = React.useState(false);

    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in logging you in")
    const [otpModalVisible, setOtpModalVisible] = React.useState(false)

    const validateUser = async (otp) => {
        setIsOtpModalLoading(true)
        try {
            const validated = await authService.validateOTP(otp);
            if (validated.data) {
                await fetchUserPreferences()
                setOtpModalVisible(false)
                navigation.navigate(navigationconstants.PAGES.activities)
            } else {
                setErrorModalText("Please check the OTP and try again")
                setErrorModalVisible(true)
            }
        } catch (error) {
            setErrorModalText("Failed to validate OTP")
            setErrorModalVisible(true)
            log.error(`Error in validation`, error)
        } finally {
            setIsOtpModalLoading(false)
        }

    }

    const fetchUserPreferences = async () => {
        try {
            const userPreferences = await userPreferencesService.getUserPreferenceData(userData?.id)
            dispatch(setPreferences(userPreferences.data))
            setTheme(userPreferences.data?.theme);
        } catch (error) {
            log.error(`Error in fetching preferences for ${mobile} `, error)
            setErrorModalText("Error occurred in fetching preferences settings")
            setErrorModalVisible(true)
        }
    }

    const loginUser = async () => {
        setIsLoading(true);
        try {
            const userData = await userService.getUserDataFromMobileNumber(mobile);
            dispatch(setUserData(userData.data))
            setOtpModalVisible(true)
        } catch (error) {
            if (error.response.status === HttpStatusCode.NotFound) {
                log.error(`Error in login, user not found for ${mobile} `, error)
                setErrorModalText("User not found, please check again. \nIf you are a new user please register.")
            } else {
                log.error(`Error in login, for user ${mobile} `, error)
                setErrorModalText("We have encountered an error in logging you in.")
            }
            setErrorModalVisible(true)
            log.error("Error in login", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ErrorModal
                errorDescription={errorModalText}
                errorTitle={"Login Error"}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[loginStyles.welcomeLabelContainer]} >
                    <Heading size="4xl">
                        Welcome
                    </Heading>
                    <Heading size="xl">
                        NRG Remix
                    </Heading>
                </View>

                <View style={loginStyles.loginInputContainer}>
                    <FormControl isRequired>
                        <VStack space={4} mt="24" alignItems="center">
                            <VStack space={1}>
                                <FormControl.Label mx="10" alignSelf="flex-start">Login</FormControl.Label>
                                <Input
                                    width="xs"
                                    mx="10"
                                    placeholder="mobile number"
                                    keyboardType="phone-pad"
                                    value={mobile}
                                    onChangeText={text => setMobile(text)}
                                />
                            </VStack>
                            <Button
                                isLoading={isLoading}
                                width="1/4"
                                onPress={loginUser}>
                                Login
                            </Button>
                        </VStack>
                    </FormControl>

                    <Image
                        source={require('../../resources/login.png')}
                        style={loginStyles.image}
                    />

                    <HStack style={loginStyles.linkContainer}>
                        <Button
                            width="1/5"
                            onPress={() => navigation.navigate(navigationconstants.PAGES.personalDetails)}>
                            Sign Up
                        </Button>


                    </HStack>
                </View>

                {/* OTP Validation Modal */}
                <InputModal
                    buttonText={"Login"}
                    header={"Validate mobile"}
                    label={"OTP"}
                    confirmButtonText={"Validate"}
                    modalVisible={otpModalVisible}
                    setModalVisible={setOtpModalVisible}
                    onConfirm={validateUser}
                    isLoading={isOtpModalLoading}
                />
            </ScrollView >
        </View >

    );
};

export default LoginPage;
