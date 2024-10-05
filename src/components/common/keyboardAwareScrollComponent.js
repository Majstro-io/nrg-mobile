import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import useKeyboard from "../../hooks/useKeyboard";

const KeyboardAwareScrollComponent = ({ children }) => {
    const isKeyboardVisible = useKeyboard();
    return (
        <KeyboardAwareScrollView
            scrollEnabled={isKeyboardVisible}
        >
            {children}
        </KeyboardAwareScrollView>
    )
}

export default KeyboardAwareScrollComponent;