import { StyleSheet } from "react-native";

const activitiesStyles = StyleSheet.create({
    loginInputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    LabelContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },

    appbar: {
        alignItems: 'left',
    },
    image: {
        width: 125,
        height: 125
    },
    linkContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    button: {
        borderRadius: 25,
        backgroundColor: "#a78bfa"
    }, 
    activitiesContainer: {
        marginBottom: 20 ,
    }
});


export default activitiesStyles;