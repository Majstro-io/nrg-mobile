import React from "react";
import { Image } from "react-native";
import loginStyles from "./login.styles";
import { useNavigation } from "@react-navigation/native";
import { Button, FormControl, HStack, Heading, Input, Link, ScrollView, Text, VStack, View, useTheme } from 'native-base';
import navigationconstants from "../../constants/navigationConstants";

const LoginPage = () => {
    const navigation = useNavigation();
    const [mobile, setMobile] = React.useState('');

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[loginStyles.welcomeLabelContainer]} >
                    <Heading size="4xl">
                        Welcome
                    </Heading>
                    <Heading size="xl">
                        NRG Remix
                    </Heading>
                </View>

                <View style={loginStyles.loginInputContainer}>
                    <FormControl isRequired>
                        <VStack space={4} mt="24" alignItems="center">
                            <VStack space={1}>
                                <FormControl.Label mx="10" alignSelf="flex-start">Login</FormControl.Label>
                                <Input
                                    width="xs"
                                    mx="10"
                                    placeholder="mobile number"
                                    keyboardType="numeric"
                                    value={mobile}
                                    onChangeText={text => setMobile(text)}
                                />
                            </VStack>
                            <Button
                                style={loginStyles.button}
                                width="1/4"
                                onPress={() => navigation.navigate(navigationconstants.PAGES.activities)}>
                                Login
                            </Button>
                        </VStack>
                    </FormControl>

                    <Image
                        source={require('../../resources/login.png')}
                        style={loginStyles.image}
                    />

                    <HStack style={loginStyles.linkContainer}>
                        <Text fontSize="sm">
                            I'm a new user{" "}
                        </Text>
                        <Button
                            style={loginStyles.button}
                            width="1/5"
                            onPress={() => navigation.navigate(navigationconstants.PAGES.personalDetails)}>
                            Sign Up
                        </Button>


                    </HStack>
                </View>
            </ScrollView >
        </View >

    );
};

export default LoginPage;
