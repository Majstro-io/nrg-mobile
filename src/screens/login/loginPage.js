import React from "react";
import { Image } from "react-native";
import loginStyles from "./login.styles";
import { useNavigation } from "@react-navigation/native";
import { Button, FormControl, HStack, Heading, Input, Link, ScrollView, Text, VStack, View, useTheme } from 'native-base';

const LoginPage = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [text, setText] = React.useState('');

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
                                <FormControl.Label mx="10" alignSelf="flex-start">Mobile Number</FormControl.Label>
                                <Input
                                    width="xs"
                                    mx="10"
                                    placeholder="123456789"
                                    keyboardType="numeric"

                                    value={text}
                                    onChangeText={text => setText(text)}
                                />
                            </VStack>
                            <Button
                                style={loginStyles.button}
                                width="1/4"
                                onPress={() => alert('Button Pressed')}>
                                Login
                            </Button>
                        </VStack>
                    </FormControl>

                    <Image
                        source={require('../../resources/login.png')}
                        style={loginStyles.image}
                    />

                    <HStack style={loginStyles.linkContainer} justifyContent="center">
                        <Text fontSize="sm">
                            I'm a new user.{" "}
                        </Text>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }}
                            onPress={() => navigation.navigate('PersonalDetails')}>
                            Sign Up
                        </Link>
                    </HStack>
                </View>
            </ScrollView>
        </View>

    );
};

export default LoginPage;
