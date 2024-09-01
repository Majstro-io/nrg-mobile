import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Box, Button, Center, HStack, Input, ScrollView, Text, VStack, View, IconButton, CloseIcon } from 'native-base';
import navigationconstants from "../../constants/navigationConstants";
import { Dimensions, Keyboard } from 'react-native';
import OTPInputModal from "../../components/modals/OtpInputModal";
import authService from "../../services/authService";
import ErrorModal from "../../components/modals/errorModal";
import validationUtils from "../../utils/validationUtils";
import log from "../../config/logger";

const { width, height } = Dimensions.get('window');

const CreateAccount = () => {
    const navigation = useNavigation();

    const [email, setEmail] = React.useState(null);
    const [phoneNumber, setPhoneNumber] = React.useState(null);
    const [isInputsValid, setIsInputsValid] = React.useState(false);
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);
    const [otpModalVisible, setOtpModalVisible] = React.useState(false)
    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in registering you")

    const procceedToRegistration = async (otp) => {
        setIsLoading(true)
        try {
            const validated = await authService.validateOTP(otp);
            if (validated.data) {
                setOtpModalVisible(false)
                navigation.navigate(navigationconstants.PAGES.personalDetails, { email: email, mobileNo: phoneNumber })
            } else {
                setErrorModalText("Please check the OTP and try again")
                setErrorModalVisible(true)
            }
        } catch (error) {
            log.error("failed to validate otp", error)
            setErrorModalText("Failed to validate OTP")
            setErrorModalVisible(true)
        } finally {
            setIsLoading(false)
        }


    }

    const verifyUser = async () => {
        setOtpModalVisible(true)
    }

    useEffect(() => {
        if (phoneNumber && validationUtils.validateEmail(email)) {
            setIsInputsValid(true);
        } else {
            setIsInputsValid(false);
        }
    }, [email, phoneNumber])

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
                errorTitle={"Registration Error"}
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
                        alt="Create Account Image"
                    />
                    <Box
                        top={keyboardHeight ? 400 - keyboardHeight : 325}
                        bg="#FFFFFF"
                        borderRadius={45}
                        width={width}
                        height={height / 1.5}
                    >
                        <HStack justifyContent="flex-end" alignItems="center" mt={2} mx={4}  >
                            <IconButton
                                icon={<CloseIcon color="black.500" />}
                                onPress={() => navigation.navigate(navigationconstants.PAGES.login)}
                                _pressed={{
                                    bgColor: "transparent",
                                }}
                                bgColor="transparent"
                            />
                        </HStack>
                        <Center>
                            <VStack space={2} alignItems="center">
                                <Text bold fontSize="2xl" >NRG Remix</Text>
                                <VStack space={0} alignItems="center">
                                    <Text fontSize="4xl" textAlign="center" lineHeight="xs" mb={4}>Create an account</Text>
                                    <Text fontSize="sm" textAlign="center" lineHeight="xs" mb={4}>
                                        We will send you the
                                        <Text fontWeight="bold"> 5 digit</Text>
                                        <Text> verification code</Text>
                                    </Text>
                                </VStack>
                                <VStack space={3} alignItems="center" >
                                    <Input
                                        mx="10"
                                        placeholder="Email Address"
                                        keyboardType="email-address"
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                    />
                                    <Input
                                        mx="10"
                                        placeholder="Phone Number"
                                        keyboardType="phone-pad"
                                        value={phoneNumber}
                                        onChangeText={text => setPhoneNumber(text)}
                                    />
                                    <Button
                                        bg="yellow.500"
                                        _pressed={{ bg: "yellow.400" }}
                                        _loading={{ bg: "yellow.700" }}
                                        _text={{ color: "black.800" }}
                                        disabled={!isInputsValid}
                                        onPress={verifyUser}
                                    >
                                        Register
                                    </Button>
                                </VStack>
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
                        instructions={`Enter the OTP sent to ${phoneNumber}`}
                        confirmButtonText={"Verify"}
                        modalVisible={otpModalVisible}
                        setModalVisible={setOtpModalVisible}
                        onConfirm={procceedToRegistration}
                        isLoading={isLoading}
                    />
                </Box>
            </ScrollView>
        </View >

    );
};

export default CreateAccount;
