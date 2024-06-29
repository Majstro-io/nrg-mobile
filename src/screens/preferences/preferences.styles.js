import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
    registerInputContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        margin: 10
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
        width: '100%',
        marginBottom: 20,
    },
    image: {
        marginBottom: 20,

    },
});


export default loginStyles;