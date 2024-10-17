import { Box, Button, Heading, HStack, Modal, Text, VStack } from "native-base";

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
                    <Box padding={5}>
                        <Heading mb={3} fontSize="2xl" textAlign="center" bold>{errorTitle || "Error"}</Heading>
                        <Text fontSize="md" textAlign="center">{errorDescription}</Text>
                    </Box>
                    <HStack mb={2}>
                        <Button
                            width="1/2"
                            bgColor="transparent"
                            variant="outline"
                            borderRadius={0}
                            borderWidth={0}
                            _text={{ color: 'red.500', fontSize: 'md' }}
                            onPress={handleConfirm}>
                            YES
                        </Button>
                        <Button
                            width="1/2"
                            bgColor="transparent"
                            variant="outline"
                            borderRadius={0}
                            borderWidth={0}
                            _text={{ color: 'base.500', fontSize: 'md' }}
                            onPress={() => setVisible(false)}>
                            NO
                        </Button>
                    </HStack>
                </VStack>
            </Modal.Content>
        </Modal>
    );
};

export default AlertModal;
