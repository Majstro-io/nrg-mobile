import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, View, Button, CheckIcon, Input, Select, VStack, Center, Text, HStack, FormControl } from "native-base";

import userService from "../../services/userService";
import log from "../../config/logger";
import ErrorModal from "../../components/modals/errorModal";
import { setUserData, updateUserDataField } from "../../store/slices/userSlice";
import DateInput from "../../components/inputs/dateInput";
import NrgHeader from "../../components/header/nrgHeader";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import navigationconstants from "../../constants/navigationConstants";
import Footer from "../../components/footer/footer";

const UpdatePersonalDetails = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userData = useSelector((state) => state.userData.data);

    const [isLoading, setIsLoading] = React.useState(false);
    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalMessage, setErrorModalMessage] = React.useState("")

    const updateUserData = async () => {
        setIsLoading(true)
        try {
            const userDataRequest = await userService.updateUser(userData.id, userData)
            dispatch(setUserData(userDataRequest.data))
            navigation.navigate(navigationconstants.PAGES.activities)
        } catch (error) {
            log.error("failed to update user details", error)
            setErrorModalMessage("Failed to update user preferences, please retry")
            setErrorModalVisible(true)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchUserData = async () => {
        try {
            const userDetails = await userService.getUserData(userData.id);
            dispatch(setUserData(userDetails.data))
        } catch (error) {
            log.error("failed to fetch user details", error)
            setErrorModalMessage("Failed to fetch user preferences")
            setErrorModalVisible(true)
        }
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                fetchUserData();
            };
        }, [])
    );


    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <ErrorModal
                errorDescription={errorModalMessage}
                errorTitle={"Failed to update user details"}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />
            <View style={{ flex: 1 }}>

                <ScrollView
                    scrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <Center>
                        <VStack space={2} alignItems="center"  >
                            <NrgHeader />
                            <Text fontSize="3xl" color="black.800">Update Profile</Text>
                            <Text fontSize="sm" color="black.800" textAlign="center">Update profile information to get a personalized {'\n'}experience</Text>

                            <VStack space={1} alignItems="center">
                                <FormControl>
                                    <FormControl.Label>First Name</FormControl.Label>
                                    <Input
                                        width="72"
                                        placeholder="First Name"
                                        value={userData.firstName}
                                        onChangeText={data => dispatch(updateUserDataField({ key: 'firstName', value: data }))}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>Last Name</FormControl.Label>
                                    <Input
                                        width="72"
                                        placeholder="Last Name"
                                        value={userData.lastName}
                                        onChangeText={data => dispatch(updateUserDataField({ key: 'lastName', value: data }))}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>Date of Birth (YYYY-MM-DD)</FormControl.Label>
                                    <DateInput
                                        onChange={data => dispatch(updateUserDataField({ key: 'dob', value: data }))}
                                        value={userData?.dob}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>Gender</FormControl.Label>
                                    <Select
                                        isReadOnly
                                        selectedValue={userData.gender}
                                        onValueChange={data => dispatch(updateUserDataField({ key: 'gender', value: data }))}
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
                                        value={userData.weight}
                                        onChangeText={data => dispatch(updateUserDataField({ key: 'weight', value: data }))}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>Height (cm)</FormControl.Label>
                                    <Input
                                        width="72"
                                        placeholder="Height (cm)"
                                        keyboardType="numeric"
                                        value={userData.height}
                                        onChangeText={data => dispatch(updateUserDataField({ key: 'height', value: data }))}
                                    />
                                </FormControl>

                                <Button
                                    mt={3}
                                    width="72"
                                    _text={{ color: "base.500" }}
                                    bgColor="black.800"
                                    isLoading={isLoading}
                                    onPress={updateUserData}
                                >
                                    Save
                                </Button>
                            </VStack>

                        </VStack>
                    </Center>
                </ScrollView>
            </View>
            <View style={{ flex: 0.15 }}>
                <Footer />
            </View>
        </View>
    );
};

export default UpdatePersonalDetails;
