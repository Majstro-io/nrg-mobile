import { Box, Button, HStack, Modal, Text, VStack } from "native-base";

const AlertModal = ({ errorTitle, errorDescription, visible, setVisible, onConfirm }) => {

    const handleConfirm = () => {
        setVisible(false);
        if (onConfirm) {
            onConfirm();
        }
    }

    return (
        <Modal size="lg" isOpen={visible} onClose={() => setVisible(false)}>
            <Modal.Content>
                <VStack space={4}>
                    <Box padding={4}>
                        <Text mb={5} fontSize="xl" textAlign="center" bold>{errorTitle || "Error"}</Text>
                        <Text fontSize="lg" textAlign="center">{errorDescription}</Text>
                    </Box>
                    <HStack>
                        <Button
                            width="1/2"
                            bgColor="transparent"
                            variant="outline"
                            borderRadius={0}
                            _text={{ color: 'red.500', fontSize: 'md' }}
                            onPress={handleConfirm}>
                            Yes
                        </Button>
                        <Button
                            width="1/2"
                            bgColor="transparent"
                            variant="outline"
                            borderRadius={0}
                            _text={{ color: 'blue.500', fontSize: 'md' }}
                            onPress={() => setVisible(false)}>
                            No
                        </Button>
                    </HStack>
                </VStack>
            </Modal.Content>
        </Modal>
    );
};

export default AlertModal;
