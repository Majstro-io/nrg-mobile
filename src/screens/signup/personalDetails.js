import React from "react";
import { Image, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, CheckIcon, FormControl, Input, Select, VStack } from "native-base";

import signupStyles from "./signup.styles";
import navigationconstants from "../../constants/navigationConstants";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";


const PersonalDetails = () => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [date, setDate] = React.useState('');

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.login} title={"Personal Details"} />


                <View style={signupStyles.registerInputContainer}>
                    <FormControl isRequired>
                        <VStack space={4} mt="4" alignItems="center">
                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">First Name</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder=""
                                    value={firstName}
                                    onChangeText={firstName => setFirstName(firstName)}
                                />
                            </VStack>

                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Last Name</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder=""
                                    value={lastName}
                                    onChangeText={lastName => setLastName(lastName)}
                                />
                            </VStack>
                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">BirthDay</FormControl.Label>
                                <Select
                                    isReadOnly
                                    selectedValue={date}
                                    onValueChange={date => setDate(date)}
                                    width="xs"
                                    placeholder="01/01/2024"
                                    _selectedItem={{
                                        bg: "info.300",
                                        endIcon: <CheckIcon size="5" />
                                    }}
                                >
                                    <Select.Item label="" value="" />

                                </Select>
                            </VStack>
                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Select Gender</FormControl.Label>
                                <Select
                                    isReadOnly
                                    selectedValue={gender}
                                    onValueChange={gender => setGender(gender)}
                                    width="xs"
                                    placeholder="Male"
                                    _selectedItem={{
                                        bg: "info.300",
                                        endIcon: <CheckIcon size="5" />
                                    }}
                                >
                                    <Select.Item label="Male" value="male" />
                                    <Select.Item label="Female" value="female" />
                                    <Select.Item label="Other" value="other" />
                                </Select>
                            </VStack>

                            <Button
                                mt={3}
                                style={signupStyles.button}
                                width="1/4"
                                onPress={() => navigation.navigate(navigationconstants.PAGES.contactDetails)}>
                                Next
                            </Button>

                            <Image
                                source={require('../../resources/personalDetails.png')}
                                style={signupStyles.imagePersonalDetails}
                            />
                        </VStack>
                    </FormControl>
                </View>
            </ScrollView>
        </View>
    );
};

export default PersonalDetails;
