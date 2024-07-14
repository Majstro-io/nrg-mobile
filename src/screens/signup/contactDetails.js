import React, { useEffect } from "react";
import { Image, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import signupStyles from "./signup.styles";
import { ScrollView, View, Button, FormControl, Input, VStack } from "native-base";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import userService from "../../services/userService";
import { useDispatch } from "react-redux";
import ErrorModal from "../../components/modals/errorModal";
import log from "../../config/logger";
import validationUtils from "../../utils/validationUtils";
import { setUserData } from "../../store/slices/userSlice";


const ContactDetails = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalMessage, setErrorModalMessage] = React.useState("Please fill in all the details required to proceed with the registration")
    const [userRegistrationData, setUserRegistrationData] = React.useState({
        firstName: null,
        lastName: null,
        gender: null,
        mobileNo: null,
        email: null,
        image: ""
    });

    const registerUser = () => {
        const { valid, errors } = validationUtils.validateUserRegistrationDetails(userRegistrationData);
        console.log(valid)
        if (valid) {
            userService.addNewUser(userRegistrationData).then(res => {
                dispatch(setUserData(res))
                navigation.navigate(navigationconstants.PAGES.preferences)
            }).catch(err => {
                log.error(err)
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
                                    value={userRegistrationData.email}
                                    keyboardType="email-address"
                                    onChangeText={data => setUserRegistrationData({ ...userRegistrationData, email: data })}
                                />
                            </VStack>

                            <VStack space={1}>
                                <FormControl.Label alignSelf="flex-start">Mobile Number</FormControl.Label>
                                <Input
                                    width="xs"
                                    placeholder="Mobile Number"
                                    value={userRegistrationData.mobileNo}
                                    keyboardType="numeric"
                                    onChangeText={data => setUserRegistrationData({ ...userRegistrationData, mobileNo: data })}
                                />
                            </VStack>


                            <Button
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
