import React from "react";
import {  Image, ScrollView, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import loginStyles from "./preferences.styles";
import { useNavigation } from "@react-navigation/native";

import DatePicker from "../../components/datepicker";
import DropdownComponent from "../../components/dropdown";


const Preferences = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [text, setText] = React.useState('');

    const a = (a) => {
        console.log(a)
    }

    return (
        <ScrollView style={[{ backgroundColor: theme.colors.background, padding: 20 }]}>
            <View style={loginStyles.titleContainer} >
                <Text variant="headlineMedium">
                    Personal Details
                </Text>
            </View>
            <View style={loginStyles.registerInputContainer}>
                <TextInput
                    label="First Name"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={loginStyles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Last Name"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={loginStyles.input}
                    mode="outlined"
                />
                <DatePicker onSelect={a} label={"Birthday"} />

            </View>
            <View style={loginStyles.imageContainer}>
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
        </ScrollView>
    );
};

export default Preferences;
