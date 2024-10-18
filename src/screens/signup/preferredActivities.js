import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, VStack, Center, Text, Progress, HStack, Spinner, Button, Heading, Box } from "native-base";
import { Dimensions } from 'react-native';

import navigationconstants from "../../constants/navigationConstants";
import InterestCard from "../../components/interestsCard/interestCard";
import { addUserFavouriteActivity, setPreferences } from "../../store/slices/userPreferencesSlice";
import userPreferencesService from "../../services/userPreferencesService";
import ErrorModal from "../../components/modals/errorModal";
import activitiesService from "../../services/activitiesService";
import log from "../../config/logger";
import NrgHeader from "../../components/header/nrgHeader";

const PreferredActivities = ({ route }) => {
    const { width, height } = Dimensions.get('window');
    const { isRegistration } = route.params || false;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const userData = useSelector((state) => state.userData.data);
    const userPreferences = useSelector((state) => state.userPreferences);

    const [isLoading, setIsLoading] = useState(false);
    const [activities, setActivities] = useState([]);

    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in fetching user preferences")
    const [errorModalTitle, setErrorModalTitle] = React.useState("Fetching Activities Failed")

    const fetchUserPreferences = async () => {
        setIsLoading(true)
        userPreferencesService.getUserPreferenceData(userData?.id).then(res => {
            dispatch(setPreferences(res.data))
        }).catch(error => {
            setErrorModalText("Failed to fetch user preferences, please try reloading")
            setErrorModalTitle("Failed to fetch preferences")
            setErrorModalVisible(true)
            log.error("Error in fetching user preferences from preferences page", error)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const getAllActivities = async () => {
        setIsLoading(true);
        activitiesService.getAllActivities().then(res => {
            setActivities(res?.data?.content);
        }).catch(error => {
            setErrorModalVisible(true);
            setErrorModalText("We have encountered an error in fetching activities");
            setErrorModalTitle("Fetching Activities Failed");
            log.error("Failed to fetch activities", error);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const updateUserPreferences = async () => {
        const preferenceData = {
            preferedActivities: userPreferences?.favouriteIds,
            voice: userPreferences?.assistant,
            theme: userPreferences?.theme
        }
        try {
            setIsLoading(true);
            const userPreferenceRequest = await userPreferencesService.updateUserPreference(userPreferences?.id, preferenceData)
            await Promise.all([userPreferenceRequest])
            await fetchUserPreferences();
        } catch (error) {
            log.error("Error in updating user preferences from preferences page", error)
        } finally {
            setIsLoading(false);

        }
    }

    useEffect(() => {
        fetchUserPreferences();
        getAllActivities();
    }, []);

    const splitActivitiesIntoRows = () => {
        const rows = [];
        for (let i = 0; i < activities.length; i += 2) {
            rows.push({ activities: activities.slice(i, i + 2), id: i });
        }
        return rows;
    };

    const handleSavePreferences = async () => {
        await updateUserPreferences();
        navigation.navigate(navigationconstants.PAGES.setInitialPreferences, { isRegistration: isRegistration })
    }

    const activityRows = splitActivitiesIntoRows();

    return (
        <View style={{ flex: 1 }}>
            <ErrorModal
                errorDescription={errorModalText}
                errorTitle={errorModalTitle}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />
            <ScrollView scrollEnabled={true}>

                <Center>
                    <VStack space={2} alignItems="center" mt={5} mx={2} flex={1} >

                        <NrgHeader actionButtonText={"Done"} />
                        <Heading fontSize="4xl">Select Your Interest</Heading>
                        <Text fontSize="md" textAlign="center">Add preferences to get a personalized experience{`\n`}during your activity.</Text>

                        <VStack space={3} alignItems="center" mt={2}>
                            <Box >
                                {isLoading ? (
                                    <Spinner size={'lg'} />
                                ) : (
                                    <Box height={height/2} overflow="hidden">
                                        <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}>
                                            {activityRows.map((row) => (
                                                <HStack key={row?.id} space={2} mb={4}>
                                                    {row?.activities?.map((activity) => (
                                                        <InterestCard
                                                            key={activity?.id}
                                                            name={activity?.name}
                                                            imageSource={activity?.icon}
                                                            select={new Set(userPreferences?.favouriteIds)?.has(activity?.id) || false}
                                                            onPress={() => dispatch(addUserFavouriteActivity(activity?.id))}
                                                        />
                                                    ))}
                                                </HStack>
                                            ))}
                                        </ScrollView>
                                    </Box>
                                )}
                            </Box>


                            <Button
                                onPress={handleSavePreferences}
                            >
                                SAVE FAVOURITES
                            </Button>

                            {/* TODO: move to component */}
                            {isRegistration && <>
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
                                </HStack>
                                <Text fontSize="xs" textAlign="center" mt="2">1 more step</Text>
                            </>}
                        </VStack>

                    </VStack>
                </Center>
            </ScrollView>
        </View>
    );
};

export default PreferredActivities;
