import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, Heading, } from 'native-base';

import ActivityCard from '../../components/activityCard/activityCard';
import NrgActivitiesAppBar from '../../components/appbars/nrgActivitiesAppBar';

import activities from '../../data/activities.json'
import { useNavigation } from '@react-navigation/native';
import navigationconstants from '../../constants/navigationConstants';


const Activities = () => {
  const navigation = useNavigation();

  const favourites = useSelector((state) => state.userPreferences.favourites);

  const [isOnlyFavourites, setIsOnlyFavourites] = useState(true);

  const favouriteActivityIds = new Set(favourites.map(fav => fav.activityId));

  const onFavouriteFilterPress = (value) => {
    setIsOnlyFavourites(value)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView >
        <NrgActivitiesAppBar isFavourite={isOnlyFavourites} onFavouriteToggle={onFavouriteFilterPress} />
        <View
          flex={1}
          alignItems={"center"}
          marginTop={10}
        >
          <Heading size="4xl">Activities</Heading>
        </View>

        {/* display only favourites */}
        <View marginBottom={10}>
          {isOnlyFavourites ? activities.content.filter(activity => favouriteActivityIds.has(activity.id)).map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.name}
              description={activity.description}
              imageSource={activity.imageSource}
              onPress={() => navigation.navigate(navigationconstants.PAGES.activity, { id: activity.id, activityName: activity.name, image: activity.imageSource })}
            />
          )) : activities.content.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.name}
              description={activity.description}
              imageSource={activity.imageSource}
              onPress={() => navigation.navigate(navigationconstants.PAGES.activity, { id: activity.id, activityName: activity.name, image: activity.imageSource })}
            />
          ))}
        </View>


      </ScrollView>
    </View>
  );
};

export default Activities;
