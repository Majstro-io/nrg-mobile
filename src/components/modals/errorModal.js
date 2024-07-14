import { Button, Modal, Text } from "native-base";

const ErrorModal = ({ errorTitle, errorDescription, visible, setVisible }) => {
    return <Modal size={"xl"} isOpen={visible} onClose={() => setVisible(false)}>
        <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header fontSize="2xl"><Text>{errorTitle || "Error"}</Text></Modal.Header>
            <Modal.Body>
                <Text>
                    {errorDescription}
                </Text>
            </Modal.Body>
            <Modal.Footer>
                <Button width="1/2" onPress={() => {
                    setVisible(false);
                }}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal.Content>
    </Modal>

};

export default ErrorModal;