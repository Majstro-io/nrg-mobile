import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, Heading, Spinner, } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import ActivityCard from '../../components/activityCard/activityCard';
import NrgActivitiesAppBar from '../../components/appbars/nrgActivitiesAppBar';
import navigationconstants from '../../constants/navigationConstants';
import activitiesService from '../../services/activitiesService';
import log from '../../config/logger';
import ErrorModal from '../../components/modals/errorModal';


const Activities = () => {
  const navigation = useNavigation();

  const favourites = useSelector((state) => state.userPreferences.favourites);

  const [isOnlyFavourites, setIsOnlyFavourites] = useState(true);
  const [activities, setActivities] = useState([]);
  
  const [errorModalVisible, setErrorModalVisible] = React.useState(false)
  const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in fetching activities")
  const [errorModalTitle, setErrorModalTitle] = React.useState("Fetching Activities Failed")
  
  const [isLoading, setIsLoading] = React.useState(false);

  const favouriteActivityIds = favourites?.map(fav => fav);

  const onFavouriteFilterPress = (value) => {
    setIsOnlyFavourites(value)
  }

  const getAllActivities = async () => {
    setIsLoading(true)
    activitiesService.getAllActivities().then(res => {
      setActivities(res?.data?.content);
    }).catch(error => {
      setErrorModalVisible(true)
      setErrorModalText("We have encountered an error in fetching activities")
      setErrorModalTitle("Fetching Activities Failed")
      log.error("Failed to fetch activities", error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const getAllFavouriteActivities = async () => {
    if (favouriteActivityIds.length == 0) {
      setErrorModalVisible(true)
      setErrorModalText("You don't have any favourites selected, please select favourite activities from preferences")
      setErrorModalTitle("No Favourites Selected")
      setIsOnlyFavourites(false)
    } else {
      setIsLoading(true)
      activitiesService.getActivitiesByType(favouriteActivityIds).then(res => {
        setActivities(res?.data);
      }).catch(error => {
        setErrorModalVisible(true)
        setErrorModalText("We have encountered an error in fetching favourite activities")
        setErrorModalTitle("Fetching Activities Failed")
        log.error("Failed to fetch activities", error)
      }).finally(() => {
        setIsLoading(false)
      })
    }

  }

  useEffect(() => {
    if (isOnlyFavourites) {
      getAllFavouriteActivities();
    } else {
      getAllActivities();
    }
  }, [isOnlyFavourites, favourites])


  return (
    <View style={{ flex: 1 }}>
      <ErrorModal
        errorDescription={errorModalText}
        errorTitle={errorModalTitle}
        setVisible={setErrorModalVisible}
        visible={errorModalVisible}
      />
      <ScrollView >
        <NrgActivitiesAppBar isFavourite={isOnlyFavourites} onFavouriteToggle={onFavouriteFilterPress} />
        <View
          flex={1}
          alignItems={"center"}
          marginTop={10}
        >
          <Heading size="4xl">Activities</Heading>
        </View>
        {isLoading ? <Spinner size={'lg'} /> : <View marginBottom={10}>
          {activities?.map((activity) => (
            <ActivityCard
              key={activity?.id}
              title={activity?.name}
              description={activity?.description}
              imageSource={activity?.icon}
              onPress={() => navigation.navigate(navigationconstants.PAGES.activity, { id: activity?.id, activityName: activity?.name, image: activity?.icon })}
            />))}
        </View>}



      </ScrollView>
    </View>
  );
};

export default Activities;
