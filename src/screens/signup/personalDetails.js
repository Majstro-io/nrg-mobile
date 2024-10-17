import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HttpStatusCode } from "axios";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, CheckIcon, Input, Select, VStack, Center, Text, Progress, HStack, FormControl, Heading } from "native-base";

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
import NrgHeader from "../../components/header/nrgHeader";

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
        try {
            const defaultUserPreferences = { ...defaultUserPreferencesData, profileId: userId }
            const userPrefs = await (userPreferencesService.addNewUserPreference(defaultUserPreferences))
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
            log.error("Error in creating user preferences for user", error.response)
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
            log.error("Error in registering new user ", error.response.message)
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
        setIsLoading(false)

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
            <ScrollView
                scrollEnabled={true}
                keyboardShouldPersistTaps='handled'
            >
                <HStack justifyContent="flex-end" alignItems="center" mt={5} mx={2} flex={1}>

                </HStack>
                <Center>
                    <VStack space={2} alignItems="center"  >
                    <NrgHeader marginTop="5" />
                        <Heading fontSize="4xl" >Add profile info</Heading>
                        <Text fontSize="md" textAlign="center">Add profile information to get a personalized {'\n'}experience</Text>
                        <VStack space={1} alignItems="center">
                            <FormControl>
                                <FormControl.Label>First Name</FormControl.Label>
                                <Input
                                    width="72"
                                    placeholder="First Name"
                                    value={userRegistrationData.firstName}
                                    onChangeText={data => setUserRegistrationData({ ...userRegistrationData, firstName: data })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Last Name</FormControl.Label>
                                <Input
                                    width="72"
                                    placeholder="Last Name"
                                    value={userRegistrationData.lastName}
                                    onChangeText={data => setUserRegistrationData({ ...userRegistrationData, lastName: data })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Date of Birth (YYYY-MM-DD)</FormControl.Label>
                                <DateInput
                                    onChange={data => setUserRegistrationData({ ...userRegistrationData, dob: data })}
                                    value={userRegistrationData.dob}
                                    label={"Date of birth"}
                                />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Gender</FormControl.Label>
                                <Select
                                    isReadOnly
                                    selectedValue={userRegistrationData.gender}
                                    onValueChange={gender => setUserRegistrationData({ ...userRegistrationData, gender: gender })}
                                    width="72"
                                    placeholder="Select Gender"
                                    _selectedItem={{
                                        endIcon: <CheckIcon size="5" />
                                    }}
                                >
                                    <Select.Item label="Male" value="MALE" />
                                    <Select.Item label="Female" value="FEMALE" />
                                    <Select.Item label="Other" value="OTHER" />
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Weight (kg)</FormControl.Label>
                                <Input
                                    width="72"
                                    placeholder="Weight (kg)"
                                    keyboardType="numeric"
                                    value={userRegistrationData.weight}
                                    onChangeText={data => setUserRegistrationData({ ...userRegistrationData, weight: data })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Height (cm)</FormControl.Label>
                                <Input
                                    width="72"
                                    placeholder="Height (cm)"
                                    keyboardType="numeric"
                                    value={userRegistrationData.height}
                                    onChangeText={data => setUserRegistrationData({ ...userRegistrationData, height: data })}
                                />
                            </FormControl>

                            <Button
                                mt={3}
                                isLoading={isLoading}
                                onPress={registerUser}
                            >
                                NEXT
                            </Button>
                            <HStack space={2}>
                                <Progress
                                    mt={5}
                                    width="10"
                                    value={100}
                                    colorScheme="base"
                                    bgColor="base.500"
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
                            <Text fontSize="xs" textAlign="center" mt="2"> 2 more steps</Text>
                        </VStack>

                    </VStack>
                </Center>
            </ScrollView>
        </View>
    );
};

export default PersonalDetails;
