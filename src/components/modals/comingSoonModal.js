import ErrorModal from "./errorModal";

const ComingSoonModal = ({ setVisible, visible }) => {
    return (
        <ErrorModal
            errorDescription={"This feature will be coming soon"}
            errorTitle={"Coming Soon"}
            setVisible={setVisible}
            visible={visible}
        />
    );
};

export default ComingSoonModal;
