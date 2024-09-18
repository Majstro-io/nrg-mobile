import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from 'react-native';
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
import useKeyboard from "../../hooks/useKeyboard";
import NrgHeader from "../../components/header/nrgHeader";

const { width, height } = Dimensions.get('window');

const LoginPage = () => {
    const navigation = useNavigation();
    const isKeyboardVisible = useKeyboard();
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
            const validated = await authService.login(otp, mobile);
            if (validated.status == HttpStatusCode.Created) {
                await authUtils.saveTokens(
                    validated.data.idToken,
                    validated.data.accessToken,
                    validated.data.refreshToken
                )
                await fetchUserPreferences(userData?.id)
                await authUtils.saveLoginData(userData?.id?.toString(), new Date().toString())
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

    const fetchUserPreferences = async (userId) => {
        try {
            const userPreferences = await userPreferencesService.getUserPreferenceData(userId)
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

    // if previously logged in auto log in if available
    const retrieveLoggedData = async () => {
        setIsLoading(true);
        try {
            const logDetails = await authUtils.fetchLoginDataFromCache();

            if (!logDetails || !logDetails.lastLoginTime || !logDetails.userId) {
                throw new Error('Invalid login details');
            }

            const currentDate = new Date();
            const lastLoginDate = new Date(logDetails.lastLoginTime);
            const timeDifference = currentDate - lastLoginDate;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

            if (daysDifference < 7) {
                const userData = await userService.getUserData(logDetails?.userId);
                await fetchUserPreferences(logDetails?.userId)
                dispatch(setUserData(userData.data))
                log.info("Logged in using previous logged info")
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: navigationconstants.PAGES.activities }],
                    })
                );
            }
        } catch (error) {
            log.error('Error retrieving logged data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // retrieveLoggedData();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ErrorModal
                errorDescription={errorModalText}
                errorTitle={"Login Error"}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
            >
                <Box position="relative" height={height}>
                    <Image
                        source={require('../../resources/login/login.jpeg')}
                        size="100%"
                        height={height / 1.8}
                        position="absolute"
                        zIndex={-1}
                        alt="Login Image"
                    />
                    <Box
                        top={isKeyboardVisible ? '40%' : '50%'}
                        bg="white.100"
                        borderRadius={45}
                        width={width}
                        height={height / 1.5}
                    >
                        <Center mt={5}>
                            <VStack space={3} alignItems="center">
                                <NrgHeader marginTop="0" />
                                <VStack space={0} alignItems="center">
                                    <Text fontSize="3xl" textAlign="center" lineHeight="xs" mb={4}>Discover a Healthier {'\n'} Stronger you</Text>
                                </VStack>
                                <Input
                                    mx="10"
                                    placeholder="Phone number"
                                    keyboardType="phone-pad"
                                    value={mobile}
                                    onChangeText={text => setMobile(text)}
                                    onSubmitEditing={loginUser}
                                />
                                <Button
                                    bg="black.800"
                                    _text={{ color: "base.500" }}
                                    isLoading={isLoading}
                                    onPress={loginUser}>
                                    Login
                                </Button>
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

                    {/* OTP Validation Modal TODO: refactor */}
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
