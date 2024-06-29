import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
    loginInputContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'flex-end'
    },
    registerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        alignContent: 'flex-end'
    },
    welcomeLabelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        width: 150,
        height: 50,

        justifyContent: 'center'

    },
    registerButton: {
        width: 150,
        height: 40,

        justifyContent: 'center'
    },
    input: {
        width: '80%',
        marginBottom: 20,
    },
    image: {
        marginTop: 10,
        aspectRatio: 1,
    },
});


export default loginStyles;