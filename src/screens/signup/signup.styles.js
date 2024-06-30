import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
    topicLabelContainer: {
        justifyContent: 'flex-start',
        alignItems: 'left',
        marginTop: 50,
    },

    registerInputContainer: {
        marginTop: 10
    },  

    imagePersonalDetails: {
        marginTop: 65,
        width: 380, 
        height: 160,
    },

    imageContactDetails: {
        marginTop: 30,
        width: 350, 
        height: 350,
    },
    button: {
        borderRadius: 25,
        backgroundColor: "#a78bfa"
    }, 



});


export default loginStyles;