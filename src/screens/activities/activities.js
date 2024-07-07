import React, { useState } from 'react';
import { ScrollView, View, Heading, } from 'native-base';
import ActivityCard from '../../components/activityCard/activityCard';
import activitiesStyles from './activity.styles';
import NrgActivitiesAppBar from '../../components/appbars/nrgActivitiesAppBar';

import activities from '../../data/activities.json'
import { useSelector } from 'react-redux';


const Activities = () => {
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
        <View style={activitiesStyles.LabelContainer}>
          <Heading size="4xl">Activities</Heading>
        </View>

        {/* display only favourites */}
        <View style={activitiesStyles.activitiesContainer}>
          {isOnlyFavourites ? activities.content.filter(activity => favouriteActivityIds.has(activity.id)).map((activity) => (
            <ActivityCard
              id={activity.id}
              key={activity.id}
              title={activity.name}
              description={activity.description}
              imageSource={activity.imageSource}
            />
          )) : activities.content.map((activity) => (
            <ActivityCard
              id={activity.id}
              key={activity.id}
              title={activity.name}
              description={activity.description}
              imageSource={activity.imageSource}
            />
          ))}
        </View>


      </ScrollView>
    </View>
  );
};

export default Activities;
