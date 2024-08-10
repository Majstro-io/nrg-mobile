import React from "react";
import { Image, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, CheckIcon, FormControl, Input, Select, VStack } from "native-base";

import signupStyles from "./signup.styles";
import navigationconstants from "../../constants/navigationConstants";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import DateInput from "../../components/inputs/dateInput";


const PersonalDetails = () => {
    const navigation = useNavigation();

    const [userData, setUserData] = React.useState({
        firstName: null,
        lastName: null,
        gender: null,
        dob: null
    });

    const proceedToNextPage = () => {
        navigation.navigate(navigationconstants.PAGES.contactDetails, { userData: userData })
    }

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
                                    placeholder="First Name"
                                    value={userData.firstName}
                                    onChangeText={data => setUserData({ ...userData, firstName: data })}
                                />
                            </VStack>

                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Last Name</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder="Last Name"
                                    value={userData.lastName}
                                    onChangeText={data => setUserData({ ...userData, lastName: data })}
                                />
                            </VStack>
                            <VStack width={"80%"} space={1}>
                                <DateInput label={"BirthDate"} onChange={data => setUserData({ ...userData, dob: data })} />
                            </VStack>
                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Select Gender</FormControl.Label>
                                <Select
                                    isReadOnly
                                    selectedValue={userData.gender}
                                    onValueChange={gender => setUserData({ ...userData, gender: gender })}
                                    width="xs"
                                    placeholder="Male"
                                    _selectedItem={{
                                        endIcon: <CheckIcon size="5" />
                                    }}
                                >
                                    <Select.Item label="Male" value="MALE" />
                                    <Select.Item label="Female" value="FEMALE" />
                                </Select>
                            </VStack>

                            <Button
                                mt={3}
                                width="1/4"
                                onPress={proceedToNextPage}>
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
