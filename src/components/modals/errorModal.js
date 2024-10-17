import { Button, Modal, Text, VStack, HStack, Box, Heading } from "native-base";

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
                        <Heading mb={3} fontSize="2xl" textAlign="center">
                            {errorTitle || "Error"}
                        </Heading>
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
                            OK
                        </Button>
                    </HStack>
                </VStack>
            </Modal.Content>
        </Modal>
    );
};

export default ErrorModal;
