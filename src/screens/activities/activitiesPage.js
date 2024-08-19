import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, Spinner, Box, VStack, HStack, Text, FavouriteIcon, Avatar, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ActivityCard from '../../components/activityCard/activityCard';
import navigationconstants from '../../constants/navigationConstants';
import activitiesService from '../../services/activitiesService';
import log from '../../config/logger';
import ErrorModal from '../../components/modals/errorModal';
import profileImage from "../../resources/profileImage.png";
import Footer from '../../components/footer/footer';

const ActivitiesPage = () => {
  const navigation = useNavigation();

  const favourites = useSelector((state) => state.userPreferences.favourites);
  const [isOnlyFavourites, setIsOnlyFavourites] = useState(true);
  const [activities, setActivities] = useState([]);

  const [errorModalVisible, setErrorModalVisible] = React.useState(false);
  const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in fetching activities");
  const [errorModalTitle, setErrorModalTitle] = React.useState("Fetching Activities Failed");

  const [isLoading, setIsLoading] = React.useState(false);
  const favouriteActivityIds = favourites?.map(fav => fav);

  const onFavouriteFilterPress = () => {
    setIsOnlyFavourites(!isOnlyFavourites);
  };

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

  const getAllFavouriteActivities = async () => {
    if (favouriteActivityIds.length === 0) {
      setErrorModalVisible(true);
      setErrorModalText("You don't have any favourites selected, please select favourite activities from preferences");
      setErrorModalTitle("No Favourites Selected");
      setIsOnlyFavourites(false);
    } else {
      setIsLoading(true);
      activitiesService.getActivitiesByType(favouriteActivityIds).then(res => {
        setActivities(res?.data);
      }).catch(error => {
        setErrorModalVisible(true);
        setErrorModalText("We have encountered an error in fetching favourite activities");
        setErrorModalTitle("Fetching Activities Failed");
        log.error("Failed to fetch activities", error);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    if (isOnlyFavourites) {
      getAllFavouriteActivities();
    } else {
      getAllActivities();
    }
  }, [isOnlyFavourites, favourites]);

  const splitActivitiesIntoRows = (activities) => {
    const rows = [];
    for (let i = 0; i < activities.length; i += 2) {
      rows.push({ activities: activities.slice(i, i + 2), id: i });
    }
    return rows;
  };

  const activityRows = splitActivitiesIntoRows(activities);

  return (
    <View style={{ flex: 1 }}>
      <ErrorModal
        errorDescription={errorModalText}
        errorTitle={errorModalTitle}
        setVisible={setErrorModalVisible}
        visible={errorModalVisible}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box flex={1} padding={4}>
          <VStack space={1} flex={1}>

            <HStack space={5} justifyContent="space-between" alignItems="center" mt={5}>
              <Text bold fontSize="2xl" flex={1}>NRG Remix</Text>
              <IconButton icon={<FavouriteIcon size="xl" />} onPress={onFavouriteFilterPress} colorScheme={isOnlyFavourites ? "red" : "gray"} />

              <Avatar source={profileImage} onTouchStart={() => navigation.navigate(navigationconstants.PAGES.login)} size="sm" />
            </HStack>

            <VStack space={4} alignItems="center" flex={1}>
              <Text fontSize="4xl" >Activities</Text>
              {isLoading ? <Spinner size={'lg'} /> :
                activityRows.map((row) => (
                  <HStack key={row?.id} space={1}>
                    {row?.activities?.map(activity => (
                      <ActivityCard
                        key={activity?.id}
                        title={activity?.name}
                        hStackBgColor="#AAF5FF"
                        description={activity?.description}
                        imageSource={activity?.icon}
                        onPress={() => navigation.navigate(navigationconstants.PAGES.activity, { id: activity?.id, activityName: activity?.name, image: activity?.icon, description: activity?.description })}
                      />
                    ))}
                  </HStack>
                ))
              }
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ActivitiesPage;
