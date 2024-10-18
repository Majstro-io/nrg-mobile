import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Spinner, Box, VStack, HStack, Text, FavouriteIcon, IconButton, Image, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import ActivityCard from '../../components/activityCard/activityCard';
import navigationconstants from '../../constants/navigationConstants';
import activitiesService from '../../services/activitiesService';
import log from '../../config/logger';
import ErrorModal from '../../components/modals/errorModal';
import Footer from '../../components/footer/footer';
import LogOffButton from '../../components/modals/logoutConfirmation';
import userPreferencesService from '../../services/userPreferencesService';
import { setPreferences } from '../../store/slices/userPreferencesSlice';
import { FlatList } from 'react-native';
import BottomNavigator from '../../components/footer/bottomNavigation';
import colorConstants from '../../constants/colorConstants';

const ActivitiesPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const userPreferences = useSelector((state) => state.userPreferences);
  const userData = useSelector((state) => state.userData.data);

  const [isOnlyFavourites, setIsOnlyFavourites] = useState(true);
  const [activities, setActivities] = useState([]);

  const [errorModalVisible, setErrorModalVisible] = React.useState(false);
  const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in fetching activities");
  const [errorModalTitle, setErrorModalTitle] = React.useState("Fetching Activities Failed");

  const [isLoading, setIsLoading] = React.useState(false);

  const activityCardWidth = 0.45;
  const activityCardHeight = 0.20;

  const onFavouriteFilterPress = () => {
    setIsOnlyFavourites(!isOnlyFavourites);
  };

  const updateUserPreferences = async () => {
    const preferenceData = {
      preferedActivities: userPreferences?.favouriteIds,
      voice: userPreferences?.assistant,
      theme: userPreferences?.theme
    }
    try {
      const userPreferenceRequest = await userPreferencesService.updateUserPreference(userPreferences?.id, preferenceData)
      await Promise.all([userPreferenceRequest])
    } catch (error) {
      log.error("Error in updating user preferences from preferences page", error)
    }
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

  const getAllFavouriteActivities = async () => {
    try {
      setIsLoading(true);
      const userPreferenceResponse = await userPreferencesService.getUserPreferenceData(userData?.id)
      dispatch(setPreferences(userPreferenceResponse.data))
      if (!userPreferenceResponse?.data?.favoriteActivities || userPreferenceResponse?.data?.favoriteActivities.length === 0) {
        setErrorModalVisible(true);
        setErrorModalText("You don't have any favourites selected, please select favourite activities from preferences");
        setErrorModalTitle("No Favourites Selected");
        setIsOnlyFavourites(false);
      } else {
        setActivities(userPreferenceResponse?.data?.favoriteActivities)
      }
    } catch (error) {
      setErrorModalVisible(true);
      setErrorModalText("Failed to fetch favourite Activities");
      setErrorModalTitle("Fetching Activities Failed");
      log.error("Failed to fetch favourite activities", error);
    } finally {
      setIsLoading(false);

    }
  };

  const fetchActivities = async () => {
    if (isOnlyFavourites) {
      await getAllFavouriteActivities();
    } else {
      await getAllActivities();
    }
  }

  useEffect(() => {
    updateUserPreferences();
  }, [userPreferences?.favouriteIds])

  useEffect(() => {
    fetchActivities();
  }, [isOnlyFavourites]);

  const renderItem = ({ item }) => (
    <ActivityCard
      key={item?.id}
      cardWidth={activityCardWidth}
      cardHeight={activityCardHeight}
      activityId={item?.id}
      title={item?.name}
      hStackBgColor={colorConstants.card}
      description={item?.description}
      imageSource={item?.icon}
      onPress={() => navigation.navigate(navigationconstants.PAGES.activity, {
        id: item?.id,
        activityName: item?.name,
        image: item?.icon,
        description: item?.description,
      })}
    />
  );


  return (
    <View style={{ flex: 1 }}>
      <ErrorModal
        errorDescription={errorModalText}
        errorTitle={errorModalTitle}
        setVisible={setErrorModalVisible}
        visible={errorModalVisible}
      />

      <Box flex={1} padding={4} mb={10}>
        <VStack space={1} flex={1}>

          {/* Activities page top header */}
          <HStack space={5} justifyContent="space-between" alignItems="center" mt={3}>
            <Image
              source={require("../../resources/logo/nrglogo.png")}
              alt="NRG Remix Logo"
              mb={3}
              height={'100%'}
              width={'50%'}
              resizeMode='contain'
            />
            <HStack space={5} justifyContent="space-between" alignItems="center">
              <IconButton icon={<FavouriteIcon size="xl" />} onPress={onFavouriteFilterPress} colorScheme={isOnlyFavourites ? "base" : "gray"} />
              <LogOffButton />
            </HStack>

          </HStack>

          <VStack space={5} alignItems="center" flex={1}>
            <Heading fontSize="4xl" >Activities</Heading>
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <FlatList
                data={activities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 50 }}
                onRefresh={fetchActivities}
                refreshing={isLoading}
                showsVerticalScrollIndicator={false}
              />
            )}
          </VStack>
        </VStack>

      </Box>
      <BottomNavigator />
    </View>
  );
};

export default ActivitiesPage;
