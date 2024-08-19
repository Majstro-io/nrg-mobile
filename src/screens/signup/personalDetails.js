import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HttpStatusCode } from "axios";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, CheckIcon, Input, Select, VStack, Center, Text, Progress, HStack } from "native-base";

import navigationconstants from "../../constants/navigationConstants";
import validationUtils from "../../utils/validationUtils";
import userService from "../../services/userService";
import log from "../../config/logger";
import ErrorModal from "../../components/modals/errorModal";
import { setPreferences } from "../../store/slices/userPreferencesSlice";
import { setUserData } from "../../store/slices/userSlice";
import userPreferencesService from "../../services/userPreferencesService";
import defaultUserPreferencesData from "../../data/defaultUserPreferences.json"
import DateInput from "../../components/inputs/dateInput";

const PersonalDetails = ({ route }) => {
    const { email, mobileNo } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [userRegistrationData, setUserRegistrationData] = React.useState({
        firstName: null,
        lastName: null,
        gender: null,
        weight: null,
        height: null,
        dob: null,
        mobileNo: null,
        email: null,
        image: "-"
    });

    const [isLoading, setIsLoading] = React.useState(false);
    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalMessage, setErrorModalMessage] = React.useState("Please fill in all the details required to proceed with the registration")


    const saveDefaultUserPreferences = async (userId) => {
        console.log(userId)
        try {
            const defaultUserPreferences = { ...defaultUserPreferencesData, profileId: userId }
            const userPrefs = await (userPreferencesService.addNewUserPreference(defaultUserPreferences))
            console.log(userPrefs.data)
            dispatch(setPreferences(userPrefs.data))
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: navigationconstants.PAGES.interest, params: { isRegistration: true } }],
                })
            );
        } catch (error) {
            setErrorModalMessage("An error occurred in configuring user preferences")
            setErrorModalVisible(true)
            log.error("Error in creating user preferences for user", error)
        }
    }

    const registerNewUser = async () => {
        try {
            const createdUser = (await userService.addNewUser(userRegistrationData)).data;
            dispatch(setUserData(createdUser))
            await saveDefaultUserPreferences(createdUser?.id)
        } catch (error) {
            if (error?.response?.data?.status == HttpStatusCode.BadRequest) {
                if (error?.response?.data?.message == "User already exists") {
                    setErrorModalMessage("Mobile Number is already in use!")
                } else {
                    setErrorModalMessage("An error occurred in registration, please check your input details and retry")
                }
            } else {
                setErrorModalMessage("An error occurred in registration")
            }
            setErrorModalVisible(true)
            log.error("Error in registering new user ", error)
        } finally {
            setIsLoading(false);
        }
    }

    const registerUser = async () => {
        setIsLoading(true)
        const { valid, errors } = validationUtils.validateUserRegistrationDetails(userRegistrationData);
        if (valid) {
            await registerNewUser();
        } else {
            if (errors.email) {
                setErrorModalMessage("Please provide a valid email")
            } else {
                setErrorModalMessage("Please fill in all the details required to proceed with the registration")
            }
            setErrorModalVisible(true)
        }

    }

    // set email and mobile number taken from previous screen to the state
    useEffect(() => {
        setUserRegistrationData({ ...userRegistrationData, email: email, mobileNo: mobileNo })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ErrorModal
                errorDescription={errorModalMessage}
                errorTitle={"Fill all the fields"}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />
            <ScrollView scrollEnabled={false}>
                <HStack justifyContent="flex-end" alignItems="center" mt={5} mx={2} flex={1}>

                </HStack>
                <Center>
                    <VStack space={2} alignItems="center"  >

                        <Text bold fontSize="2xl" color="#181725" mb={3}>NRG Remix</Text>
                        <Text fontSize="3xl" color="#181725">Add profile info</Text>
                        <Text fontSize="sm" color="#181725" textAlign="center">Add profile information to get a personalized {'\n'}experience</Text>

                        <VStack space={5} alignItems="center">
                            <Input
                                mt={8}
                                width="72"
                                placeholder="First Name"
                                value={userRegistrationData.firstName}
                                onChangeText={data => setUserRegistrationData({ ...userRegistrationData, firstName: data })}
                            />
                            <Input
                                width="72"
                                placeholder="Last Name"
                                value={userRegistrationData.lastName}
                                onChangeText={data => setUserRegistrationData({ ...userRegistrationData, lastName: data })}
                            />
                            <DateInput
                                label={"Date of Birth (DD/MM/YYYY)"}
                                onChange={data => setUserRegistrationData({ ...userRegistrationData, dob: data })}
                            />
                            <Select
                                isReadOnly
                                selectedValue={userRegistrationData.gender}
                                onValueChange={gender => setUserRegistrationData({ ...userRegistrationData, gender: gender })}
                                width="72"
                                placeholder="Gender"
                                _selectedItem={{
                                    endIcon: <CheckIcon size="5" />
                                }}
                            >
                                <Select.Item label="Male" value="MALE" />
                                <Select.Item label="Female" value="FEMALE" />
                                <Select.Item label="Other" value="OTHER" />
                            </Select>

                            <Input
                                width="72"
                                placeholder="Weight"
                                keyboardType="numeric"
                                value={userRegistrationData.weight}
                                onChangeText={data => setUserRegistrationData({ ...userRegistrationData, weight: data })}
                            />
                            <Input
                                width="72"
                                placeholder="Height"
                                keyboardType="numeric"
                                value={userRegistrationData.height}
                                onChangeText={data => setUserRegistrationData({ ...userRegistrationData, height: data })}
                            />

                            <Button
                                mt={3}
                                width="72"
                                bgColor="#181725"
                                isLoading={isLoading}
                                onPress={registerUser}>
                                Next
                            </Button>
                            <HStack space={2}>
                                <Progress
                                    mt={5}
                                    width="10"
                                    value={100}
                                    colorScheme="blue"
                                    size="sm"
                                />
                                <Progress
                                    mt={5}
                                    width="10"
                                    value={0}
                                    colorScheme="blue"
                                    size="sm"
                                />
                                <Progress
                                    mt={5}
                                    width="10"
                                    value={0}
                                    colorScheme="blue"
                                    size="sm"
                                />
                            </HStack>
                            <Text fontSize="xs" color="#181725" textAlign="center" mt="-2"> 2 more steps</Text>
                        </VStack>

                    </VStack>
                </Center>
            </ScrollView>
        </View>
    );
};

export default PersonalDetails;
