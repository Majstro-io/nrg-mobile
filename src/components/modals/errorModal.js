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
                <VStack space={2}>
                    <Box p={4}>
                        <Text mb={5} fontSize="xl" textAlign="center" bold>
                            {errorTitle || "Error"}
                        </Text>
                        <Text fontSize="lg" textAlign="center">
                            {errorDescription}
                        </Text>
                    </Box>
                    <HStack justifyContent="center">
                        <Button
                            width="100%"
                            bgColor="transparent"
                            variant="outline"
                            borderRadius={0}
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
