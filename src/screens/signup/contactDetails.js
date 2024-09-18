import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Image, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, FormControl, Input, VStack } from "native-base";
import { HttpStatusCode } from "axios";

import signupStyles from "./signup.styles";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import userService from "../../services/userService";
import ErrorModal from "../../components/modals/errorModal";
import log from "../../config/logger";
import validationUtils from "../../utils/validationUtils";
import { setUserData } from "../../store/slices/userSlice";
import userPreferencesService from "../../services/userPreferencesService";
import { setPreferences } from "../../store/slices/userPreferencesSlice";
import defaultUserPreferencesData from "../../data/defaultUserPreferences.json"

const ContactDetails = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = React.useState(false);
    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalMessage, setErrorModalMessage] = React.useState("Please fill in all the details required to proceed with the registration")

    const [userRegistrationData, setUserRegistrationData] = React.useState({
        firstName: null,
        lastName: null,
        gender: null,
        mobileNo: null,
        email: null,
        image: "-"
    });

    const createDefaultPreferencesForUser = async (userId) => {
        const defaultUserPreferences = { ...defaultUserPreferencesData, profileId: userId }
        return await userPreferencesService.addNewUserPreference(defaultUserPreferences);
    }

    const registerUser = () => {
        const { valid, errors } = validationUtils.validateUserRegistrationDetails(userRegistrationData);
        if (valid) {
            setIsLoading(true);
            userService.addNewUser(userRegistrationData).then(res => {
                dispatch(setUserData(res.data))
                createDefaultPreferencesForUser(res.data?.id).then(res => {
                    dispatch(setPreferences(res.data))
                    navigation.navigate(navigationconstants.PAGES.setInitialPreferences)
                }).catch(error => {
                    setErrorModalMessage("An error occurred in configuring user preferences")
                    setErrorModalVisible(true)
                    log.error("Error in creating user preferences for user", error)
                })
            }).catch(error => {
                if (error.response.status == HttpStatusCode.BadRequest) {
                    setErrorModalMessage("An error occurred in registration, please check your input details and retry")
                } else {
                    setErrorModalMessage("An error occurred in registration")
                }
                setErrorModalVisible(true)
                log.error("Error in registering new user ", error)
            }).finally(() => {
                setIsLoading(false);
            })
        } else {
            if (errors.email) {
                setErrorModalMessage("Please provide a valid email")
            } else {
                setErrorModalMessage("Please fill in all the details required to proceed with the registration")
            }
            setErrorModalVisible(true)
        }

    }

    useEffect(() => {
        setUserRegistrationData({ ...userRegistrationData, ...route.params.userData })
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
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'

            >
                <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.personalDetails} title={"Contact Details"} />

                <View style={signupStyles.registerInputContainer}>
                    <FormControl isRequired>
                        <VStack space={4} mt="4" alignItems="center">
                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Email</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder="Email"
                                    value={userRegistrationData.email}
                                    keyboardType="email-address"
                                    onChangeText={data => setUserRegistrationData({ ...userRegistrationData, email: data })}
                                />
                            </VStack>

                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Mobile Number</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder="Mobile Number (ex: +1 xxx xxx xxxx)"
                                    value={userRegistrationData.mobileNo}
                                    keyboardType="phone-pad"
                                    onChangeText={data => setUserRegistrationData({ ...userRegistrationData, mobileNo: data })}
                                />
                            </VStack>


                            <Button
                                isLoading={isLoading}
                                _text={{ color: "base.500" }}
                                mt={3}
                                width="1/4"
                                onPress={() => registerUser()}>
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
