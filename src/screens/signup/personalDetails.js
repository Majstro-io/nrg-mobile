import React from "react";
import { Image, } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import signupStyles from "./signup.styles";
import { ScrollView, View, Button, Center, CheckIcon, ChevronLeftIcon, FormControl, HStack, Heading, IconButton, Input, Select, VStack } from "native-base";


const PersonalDetails = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [date, setDate] = React.useState('');



    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={signupStyles.topicLabelContainer}>
                    <HStack space={3} justifyContent="left" alignItems="center" mx="5">
                        <IconButton icon={<ChevronLeftIcon />} _icon={{
                            color: "violet.700",
                            size: "md",
                        }}
                        _light={{
                            bg: "transparent"
                          }}
                            _pressed={{
                                bg: "transparent"
                            }}
                            onPress={() => navigation.navigate('Login')}
                        />
                        <Heading size="xl">
                            Personal Details
                        </Heading>
                    </HStack>

                </View>

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
                                    <Select.Item label="Male" value="Male" />
                                    <Select.Item label="Female" value="Female" />
                                    <Select.Item label="Non Binary" value="Non Binary" />
                                </Select>
                            </VStack>

                            <Button
                                mt={3}
                                style={signupStyles.button}
                                width="1/4"
                                onPress={() => navigation.navigate('ContactDetails')}>
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
