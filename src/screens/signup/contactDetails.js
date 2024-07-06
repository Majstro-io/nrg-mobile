import React from "react";
import { Image, } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import signupStyles from "./signup.styles";
import { ScrollView, View, Button, Center, CheckIcon, ChevronLeftIcon, FormControl, HStack, Heading, IconButton, Input, Select, VStack } from "native-base";


const ContactDetails = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={signupStyles.topicLabelContainer}>
                    <HStack space={3} justifyContent="left" alignItems="center" mx="5">
                        <IconButton icon={<ChevronLeftIcon />} _icon={{
                            color: "violet.700",
                            size: "md",
                        }}
                            _pressed={{
                                bg: "transparent"
                            }}
                            _light={{
                                bg: "transparent"
                              }}
                            onPress={() => navigation.navigate('PersonalDetails')}
                        />
                        <Heading size="xl">
                            Contact Details
                        </Heading>
                    </HStack>

                </View>

                <View style={signupStyles.registerInputContainer}>
                    <FormControl isRequired>
                        <VStack space={4} mt="4" alignItems="center">
                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Email</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder=""
                                    value={email}
                                    keyboardType="email-address"
                                    onChangeText={email => setEmail(email)}
                                />
                            </VStack>

                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Mobile Number</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder=""
                                    value={mobile}
                                    keyboardType="numeric"
                                    onChangeText={mobile => setMobile(mobile)}
                                />
                            </VStack>


                            <Button
                                mt={3}
                                style={signupStyles.button}
                                width="1/4"
                                onPress={() => navigation.navigate('Preferences')}>
                                Next
                            </Button>

                            <Image
                                source={require('../../resources/contactDetails.png')}
                                style={signupStyles.imageContactDetails}
                            />
                        </VStack>
                    </FormControl>
                </View>
            </ScrollView>
        </View>
    );
};

export default ContactDetails;
