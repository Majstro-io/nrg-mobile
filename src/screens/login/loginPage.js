import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, Keyboard } from 'react-native';
import { HttpStatusCode } from "axios";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Image, Box, Button, Center, HStack, Input, ScrollView, Text, VStack, View, Link } from 'native-base';

import navigationconstants from "../../constants/navigationConstants";
import userService from "../../services/userService";
import { setUserData } from "../../store/slices/userSlice";
import log from "../../config/logger";
import ErrorModal from "../../components/modals/errorModal";
import userPreferencesService from "../../services/userPreferencesService";
import { setPreferences } from "../../store/slices/userPreferencesSlice";
import { useTheme } from "../../styles/ThemeContext";
import authService from "../../services/authService";
import OTPInputModal from "../../components/modals/OtpInputModal";
import authUtils from "../../utils/authUtils";

const { width, height } = Dimensions.get('window');

const LoginPage = () => {
    const navigation = useNavigation();
    const { setTheme } = useTheme();

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.data);

    const [mobile, setMobile] = React.useState(null);
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isOtpModalLoading, setIsOtpModalLoading] = React.useState(false);

    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in logging you in")
    const [otpModalVisible, setOtpModalVisible] = React.useState(false)

    const validateUser = async (otp) => {
        setIsOtpModalLoading(true)
        try {
            const validated = await authService.login(otp, mobile);
            if (validated.status == HttpStatusCode.Created) {
                await authUtils.saveTokens(
                    validated.data.idToken,
                    validated.data.accessToken,
                    validated.data.refreshToken
                )
                await fetchUserPreferences()
                setOtpModalVisible(false)
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: navigationconstants.PAGES.activities }],
                    })
                );
            } else {
                setErrorModalText("Please check the OTP and try again")
                setErrorModalVisible(true)
            }
        } catch (error) {
            setErrorModalText("Failed to validate OTP")
            setErrorModalVisible(true)
            log.error(`Error in validation otp`, error)
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

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => setKeyboardHeight(e.endCoordinates.height)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardHeight(0)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ErrorModal
                errorDescription={errorModalText}
                errorTitle={"Login Error"}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />
            <ScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
            >
                <Box position="relative" height={height}>
                    <Image
                        source={require('../../resources/loginPage.jpeg')}
                        size="100%"
                        height="550"
                        position="absolute"
                        zIndex={-1}
                        alt="Login Image"
                    />
                    <Box
                        top={keyboardHeight ? 400 - keyboardHeight : 350}
                        bg="white.100"
                        borderRadius={45}
                        width={width}
                        height={height / 1.5}
                    >
                        <Center mt={5}>
                            <VStack space={3} alignItems="center">
                                <Text bold fontSize="2xl" >NRG Remix</Text>
                                <VStack space={0} alignItems="center">
                                    <Text fontSize="4xl" textAlign="center" lineHeight="xs" mb={4}>Discover a Healthier {'\n'} Stronger you</Text>
                                </VStack>
                                <Input
                                    mx="10"
                                    placeholder="Phone number"
                                    keyboardType="phone-pad"
                                    value={mobile}
                                    onChangeText={text => setMobile(text)}
                                />
                                <Button
                                    bg="black.800"
                                    isLoading={isLoading}
                                    onPress={loginUser}>
                                    Login
                                </Button>
                                {/* <Link
                                    _text={{
                                        fontSize: "xs"
                                    }}
                                    isUnderlined={false}>
                                    Forgot Phone Number?
                                </Link> */}
                                <HStack space={2} alignItems="center" mt={5}>
                                    <Text fontSize="md"  >Don't have an account?</Text>
                                    <Link

                                        isUnderlined={false}
                                        onPress={() => navigation.navigate(navigationconstants.PAGES.createAccount)}>
                                        Join now
                                    </Link>
                                </HStack>

                            </VStack>
                        </Center>
                    </Box>

                    {/* OTP Validation Modal */}
                    <OTPInputModal
                        buttonText={"Login"}
                        header={"NRG Remix"}
                        label={`Enter OTP to ${'\n'}Validate your phone`}
                        label1={"Don’t receive OTP?"}
                        label2={"Send Again"}
                        label3={"Don’t have an account?"}
                        label4={"Join Now"}
                        instructions={`Enter the OTP sent to ${mobile}`}
                        confirmButtonText={"Verify and Login"}
                        modalVisible={otpModalVisible}
                        setModalVisible={setOtpModalVisible}
                        onConfirm={validateUser}
                        isLoading={isOtpModalLoading}
                    />
                </Box>
            </ScrollView>
        </View >

    );
};

export default LoginPage;
