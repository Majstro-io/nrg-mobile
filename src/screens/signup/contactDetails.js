import React from "react";
import { Image, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import signupStyles from "./signup.styles";
import { ScrollView, View, Button, FormControl, Input, VStack } from "native-base";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";


const ContactDetails = () => {
    const navigation = useNavigation();

    const [email, setEmail] = React.useState(null);
    const [mobile, setMobile] = React.useState(null);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.personalDetails} title={"Contact Details"} />

                <View style={signupStyles.registerInputContainer}>
                    <FormControl isRequired>
                        <VStack space={4} mt="4" alignItems="center">
                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Email</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder="Email"
                                    value={email}
                                    keyboardType="email-address"
                                    onChangeText={email => setEmail(email)}
                                />
                            </VStack>

                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Mobile Number</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder="Mobile Number"
                                    value={mobile}
                                    keyboardType="numeric"
                                    onChangeText={mobile => setMobile(mobile)}
                                />
                            </VStack>


                            <Button
                                mt={3}
                                width="1/4"
                                onPress={() => navigation.navigate('Preferences')}>
                                Sign Up
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
