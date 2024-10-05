import { Button, FormControl, Input, Modal, Text } from "native-base";
import { useState } from "react";

const InputModal = ({ header, label, confirmButtonText, modalVisible, setModalVisible, onConfirm, isLoading }) => {
    const [input, setInput] = useState(null)

    const onConfirmPress = () => {
        if (onConfirm) {
            onConfirm(input)
        }
    }

    return (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header fontSize="2xl"><Text>{header}</Text></Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>{label}</FormControl.Label>
                        <Input onChangeText={(value) => setInput(value)} />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button isLoading={isLoading} onPress={onConfirmPress}>
                            {confirmButtonText}
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

export default InputModal;