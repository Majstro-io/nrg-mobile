import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
    loginInputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    welcomeLabelContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 90,
    },

    image: {
        marginTop: 35

    },
    linkContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 15,
        paddingTop: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(10, 10, 10, 0.7)',
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        borderRadius: 25,
        backgroundColor: "#a78bfa"
    }, 
});


export default loginStyles;