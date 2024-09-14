import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, View, Button, CheckIcon, Input, Select, VStack, Center, Text, HStack } from "native-base";

import userService from "../../services/userService";
import log from "../../config/logger";
import ErrorModal from "../../components/modals/errorModal";
import { setUserData, updateUserDataField } from "../../store/slices/userSlice";
import DateInput from "../../components/inputs/dateInput";
import NrgHeader from "../../components/header/nrgHeader";
import { useNavigation } from "@react-navigation/native";
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

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <ErrorModal
                errorDescription={errorModalMessage}
                errorTitle={"Failed to update user details"}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />
            <View style={{ flex: 1 }}>

                <ScrollView scrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}>
                    <HStack justifyContent="flex-end" alignItems="center" mt={5} mx={2} flex={1}>

                    </HStack>
                    <Center>
                        <VStack space={2} alignItems="center"  >

                            <NrgHeader />
                            <Text fontSize="3xl" color="black.800">Update profile</Text>
                            <Text fontSize="sm" color="black.800" textAlign="center">Update profile information to get a personalized {'\n'}experience</Text>

                            <VStack space={5} alignItems="center">
                                <Input
                                    mt={8}
                                    width="72"
                                    placeholder="First Name"
                                    value={userData.firstName}
                                    onChangeText={data => dispatch(updateUserDataField({ key: 'firstName', value: data }))}
                                />
                                <Input
                                    width="72"
                                    placeholder="Last Name"
                                    value={userData.lastName}
                                    onChangeText={data => dispatch(updateUserDataField({ key: 'lastName', value: data }))}
                                />
                                <DateInput
                                    label={"Date of Birth (YYYY-MM-DD)"}
                                    onChange={data => dispatch(updateUserDataField({ key: 'dob', value: data }))}
                                    value={userData.dob}
                                />
                                <Select
                                    isReadOnly
                                    selectedValue={userData.gender}
                                    onValueChange={data => dispatch(updateUserDataField({ key: 'gender', value: data }))}
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
                                    placeholder="Weight (kg)"
                                    keyboardType="numeric"
                                    value={userData.weight}
                                    onChangeText={data => dispatch(updateUserDataField({ key: 'weight', value: data }))}
                                />
                                <Input
                                    width="72"
                                    placeholder="Height (cm)"
                                    keyboardType="numeric"
                                    value={userData.height}
                                    onChangeText={data => dispatch(updateUserDataField({ key: 'height', value: data }))}
                                />

                                <Button
                                    mt={3}
                                    width="72"
                                    bgColor="black.800"
                                    isLoading={isLoading}
                                    onPress={updateUserData}>
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
