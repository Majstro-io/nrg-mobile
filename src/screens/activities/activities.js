import React from 'react';
import { ScrollView, View, HStack, Heading, IconButton, SearchIcon, ThreeDotsIcon } from 'native-base';
import ActivityCard from '../../components/activityCard/activityCard';
import activities from '../../data/activities.json'
import activitiesStyles from './activity.styles';
import NrgActivitiesAppBar from '../../components/appbars/nrgActivitiesAppBar';

const Activities = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NrgActivitiesAppBar />
        <View style={activitiesStyles.LabelContainer}>
          <Heading size="4xl">Activities</Heading>
        </View>

        <View style={activitiesStyles.activitiesContainer}>
          {activities.map((activity) => (
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
