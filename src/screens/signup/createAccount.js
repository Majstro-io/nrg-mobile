import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Box, Button, Center, HStack, Input, Text, VStack, View, IconButton, CloseIcon, Heading } from 'native-base';
import navigationconstants from "../../constants/navigationConstants";
import { Dimensions } from 'react-native';
import OTPInputModal from "../../components/modals/OtpInputModal";
import authService from "../../services/authService";
import ErrorModal from "../../components/modals/errorModal";
import validationUtils from "../../utils/validationUtils";
import log from "../../config/logger";
import useKeyboard from "../../hooks/useKeyboard";
import NrgHeader from "../../components/header/nrgHeader";

const { width, height } = Dimensions.get('window');

const CreateAccount = () => {
    const navigation = useNavigation();
    const isKeyboardVisible = useKeyboard();
    const [email, setEmail] = React.useState(null);
    const [phoneNumber, setPhoneNumber] = React.useState(null);
    const [isInputsValid, setIsInputsValid] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);
    const [otpModalVisible, setOtpModalVisible] = React.useState(false)
    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in registering you")

    const emailTextField = useRef()
    const phoneTextField = useRef()

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
        if (isInputsValid) {
            setOtpModalVisible(true)
        } else {
            setErrorModalText("Please input valid email and phone number")
            setErrorModalVisible(true)
        }
    }

    useEffect(() => {
        if (validationUtils.validateMobileWithCountryCode(phoneNumber) && validationUtils.validateEmail(email)) {
            setIsInputsValid(true);
        } else {
            setIsInputsValid(false);
        }
    }, [email, phoneNumber])


    return (
        <View style={{ flex: 1 }}>
            <ErrorModal
                errorDescription={errorModalText}
                errorTitle={"Registration Error"}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />

            <Box position="relative" height={height}>
                <Image
                    source={require('../../resources/login/login.jpeg')}
                    size="100%"
                    height={height / 1.8}
                    position="absolute"
                    zIndex={-1}
                    alt="Create Account Image"
                />
                <Box
                    top={isKeyboardVisible ? '15%' : '50%'}
                    bg="background.200"
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
                            <NrgHeader marginTop="0" />
                            <VStack space={0} alignItems="center">
                                <Heading fontSize="4xl" textAlign="center" lineHeight="xs" mb={4}>Create an Account</Heading>
                                <Text fontSize="md" textAlign="center" lineHeight="xs" mb={4}>
                                    We will send you the
                                    <Text fontWeight="bold"> 5 digit</Text>
                                    <Text> verification code</Text>
                                </Text>
                            </VStack>
                            <VStack space={3} alignItems="center" >
                                <Input
                                    ref={emailTextField}
                                    mx="10"
                                    placeholder="Email Address"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    onSubmitEditing={() => phoneTextField.current.focus()}
                                />
                                <Input
                                    ref={phoneTextField}
                                    mx="10"
                                    placeholder="Phone Number (+1xxxxxxxxx)"
                                    keyboardType="phone-pad"
                                    value={phoneNumber}
                                    onChangeText={text => setPhoneNumber(text)}
                                    onSubmitEditing={verifyUser}
                                />
                                <Button
                                    onPress={verifyUser}
                                >
                                    REGISTER
                                </Button>
                            </VStack>
                        </VStack>
                    </Center>
                </Box>

                {/* OTP Validation Modal TODO: refactor */}
                <OTPInputModal
                    buttonText={"Login"}
                    label={`Enter OTP to ${'\n'}Validate Your Phone`}
                    label1={"Don’t receive OTP?"}
                    label2={"Send Again"}
                    label3={"Don’t Have an Account?"}
                    label4={"Join Now"}
                    instructions={`Enter the OTP sent to ${phoneNumber}`}
                    confirmButtonText={"VERIFY"}
                    modalVisible={otpModalVisible}
                    setModalVisible={setOtpModalVisible}
                    onConfirm={procceedToRegistration}
                    isLoading={isLoading}
                />
            </Box>
        </View >

    );
};

export default CreateAccount;
