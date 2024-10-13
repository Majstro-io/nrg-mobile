import { Button, Modal, Text, VStack, HStack, Box } from "native-base";

const ErrorModal = ({ errorTitle, errorDescription, visible, setVisible, onConfirm }) => {

    const onConfirmAction = () => {
        if (onConfirm) {
            onConfirm()
        }
        setVisible(false);
    }

    return (
        <Modal size="lg" isOpen={visible} onClose={() => setVisible(false)}>
            <Modal.Content>
                <VStack space={0}>
                    <Box p={4}>
                        <Text mb={3} fontSize="lg" textAlign="center">
                            {errorTitle || "Error"}
                        </Text>
                        <Text fontSize="md" textAlign="center">
                            {errorDescription}
                        </Text>
                    </Box>
                    <HStack justifyContent="center">
                        <Button
                            mb="2"
                            width="100%"
                            bgColor="transparent"
                            borderWidth={0}
                            variant="outline"
                            _text={{ color: 'red.500', fontSize: 'md' }}
                            onPress={onConfirmAction}>
                            Ok
                        </Button>
                    </HStack>
                </VStack>
            </Modal.Content>
        </Modal>
    );
};

export default ErrorModal;
