import { Box, Button, Center, HStack, Link, Modal, Text, VStack, } from "native-base";
import { useState, useEffect } from "react";
import { Dimensions, Keyboard } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import colorConstants from "../../constants/colorConstants";
const { width, height } = Dimensions.get('window');

const OTPInputModal = ({
    header,
    label1,
    label2,
    label3,
    label4,
    label,
    confirmButtonText,
    modalVisible,
    setModalVisible,
    onConfirm,
    isLoading,
    instructions,
}) => {
    const [otp, setOtp] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        if (otp.length == 6) {
            onConfirmPress();
        }
    }, [otp])

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

    const onConfirmPress = () => {
        if (onConfirm) {
            onConfirm(otp);
        }
    };

    const handleCellTextChange = (text) => {
        setOtp(text)
    };

    return (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Box
                top={keyboardHeight ? '15%' : '40%'}
                bg="background.200"
                borderRadius={45}
                width={width}
                height={height}
                p={5}
            >
                <Center>
                    <VStack space={2} alignItems="center">
                        <Text bold fontSize="2xl"  >{header}</Text>
                        <VStack space={0} alignItems="center">
                            <Text fontSize="3xl" textAlign="center" lineHeight="xs" mb={2}>{label}</Text>
                            <Text fontSize="xs" textAlign="center" mb={4}>{instructions}</Text>
                        </VStack>
                        <HStack space={2} alignItems="center">
                            <OTPTextView
                                handleTextChange={handleCellTextChange}
                                containerStyle={{ marginBottom: 20 }}
                                inputCount={6}
                                textInputStyle={{
                                    color: 'inputFont.300',
                                    borderBottomColor: 'base.1000',

                                }}
                                tintColor={colorConstants.base}
                            />
                        </HStack>
                        <Button
                            bg="black.800"
                            isLoading={isLoading}
                            _text={{ color: "buttonFont.400" }}
                            disabled={otp == ''}
                            onPress={onConfirmPress}>
                            {confirmButtonText}
                        </Button>
                        <HStack space={2} alignItems="center">
                            <Text fontSize="xs" >{label1}</Text>
                            <Link
                                _text={{
                                    fontSize: "xs"
                                }}
                                isUnderlined={false}
                                onPress={() => {/* Handle resend OTP */ }}>
                                {label2}
                            </Link>
                        </HStack>
                        <HStack space={2} alignItems="center" mt={5}>
                            <Text fontSize="md">{label3}</Text>
                            <Link
                                _text={{
                                    fontSize: "md"
                                }}
                                isUnderlined={false}
                                onPress={() => {/* Handle navigation to sign-up page */ }}>
                                {label4}
                            </Link>
                        </HStack>
                    </VStack>
                </Center>
            </Box>
        </Modal>
    );
};

export default OTPInputModal;
