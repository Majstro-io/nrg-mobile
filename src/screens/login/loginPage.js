import React from "react";
import { Image, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import loginStyles from "./login.styles";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [text, setText] = React.useState('');

    return (
        <View style={[{ flex: 1, backgroundColor: theme.colors.background }]}>
            <View style={[loginStyles.welcomeLabelContainer]} />

            <View style={[loginStyles.welcomeLabelContainer]} >
                <Text variant="displayLarge">
                    Welcome
                </Text>
                <Text variant="headlineMedium">
                    NRG Remix
                </Text>
            </View>
            <View style={loginStyles.loginInputContainer}>
                <TextInput
                    label="Mobile Number"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={loginStyles.input}
                    mode="outlined"
                />
                <Button style={loginStyles.loginButton} mode="contained" onPress={() => navigation.navigate('Preferences')}>
                    Login
                </Button>
            </View>
            <View style={loginStyles.registerContainer}>
                <Image
                    source={require('../../resources/login.png')}
                    style={loginStyles.image}
                />
            </View>
            <View style={loginStyles.registerContainer}>
                <Button style={loginStyles.registerButton} mode="contained" onPress={() => alert('Button Pressed')}>
                    Register
                </Button>
            </View>
        </View >

    );
};

export default LoginPage;
