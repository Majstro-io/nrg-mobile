import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, VStack, Center, Text, Progress, HStack, Spinner, Button } from "native-base";
import navigationconstants from "../../constants/navigationConstants";
import InterestCard from "../../components/interestsCard/interestCard";
import { useDispatch, useSelector } from "react-redux";
import { addUserFavouriteActivity, setPreferences } from "../../store/slices/userPreferencesSlice";
import activityTypes from "../../data/activityTypes.json"
import userPreferencesService from "../../services/userPreferencesService";
import ErrorModal from "../../components/modals/errorModal";

const PreferredActivities = ({ route }) => {
    const { isRegistration } = route.params || false;
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.data);
    const favourites = useSelector((state) => state.userPreferences.favourites);
    
    const favouriteActivityIds = new Set(favourites.map(fav => fav));

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [errorModalVisible, setErrorModalVisible] = React.useState(false)
    const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in fetching user preferences")
    const [errorModalTitle, setErrorModalTitle] = React.useState("Fetching Activities Failed")

    const fetchUserPreferences = () => {
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

    useEffect(() => {
        fetchUserPreferences();
    }, []);

    const splitActivitiesIntoRows = () => {
        const rows = [];
        for (let i = 0; i < activityTypes.content.length; i += 2) {
            rows.push({ activities: activityTypes.content.slice(i, i + 2), id: i });
        }
        return rows;
    };

    const activityRows = splitActivitiesIntoRows();

    return (
        <View style={{ flex: 1 }}>
            <ErrorModal
                errorDescription={errorModalText}
                errorTitle={errorModalTitle}
                setVisible={setErrorModalVisible}
                visible={errorModalVisible}
            />
            <ScrollView scrollEnabled={false}>
                <HStack justifyContent="flex-end" alignItems="center" mt={5} mx={2} flex={1}>

                </HStack>
                <Center>
                    <VStack space={2} alignItems="center"  >

                        <Text bold fontSize="2xl" color="black.800" mb={3}>NRG Remix</Text>
                        <Text fontSize="3xl" color="black.800">Select your interest</Text>
                        <Text fontSize="sm" color="black.800" textAlign="center">Add preferences to get a personalized experience{`\n`}during your activity.</Text>

                        <VStack space={5} alignItems="center" mt={2}>
                            {isLoading ? <Spinner size={'lg'} /> :
                                activityRows.map((row) => (
                                    <HStack key={row?.id} space={2}>
                                        {row?.activities?.map(activity => (
                                            <InterestCard
                                                key={activity?.id}
                                                name={activity?.name}
                                                imageSource={activity?.icon}
                                                select={favouriteActivityIds.has(activity?.value)}
                                                onPress={() => dispatch(addUserFavouriteActivity(activity?.value))}
                                            />
                                        ))}
                                    </HStack>
                                ))
                            }
                            <Button
                                mt={3}
                                width="72"
                                bgColor="black.800"
                                onPress={() => navigation.navigate(navigationconstants.PAGES.preferences, { isRegistration: isRegistration })}
                            >
                                Done
                            </Button>
                            {isRegistration && <>
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
                                </HStack>
                                <Text fontSize="xs" color="black.800" textAlign="center" mt="-2">1 more step</Text>
                            </>}
                        </VStack>

                    </VStack>
                </Center>
            </ScrollView>
        </View>
    );
};

export default PreferredActivities;
