import React from 'react';
import { Image, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, FormControl, HStack, Heading, Icon, IconButton, Input, Link, SearchIcon, Stack, Text, ThreeDotsIcon, VStack } from 'native-base';
import ActivityCard from '../../components/activityCard/activityCard';

import activitiesStyles from './activity.styles';

const Activities = () => {
  const navigation = useNavigation();
  const [text, setText] = React.useState('');

  const activities = [
    {
      title: 'Running',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageSource: require('../../resources/Running.png')
    },
    {
      title: 'Cycling',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageSource: require('../../resources/Cycling.png')
    },
    {
      title: 'Swimming',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageSource: require('../../resources/login.png')
    },
    {
      title: 'Reading',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageSource: require('../../resources/Reading.png')
    },
    {
      title: 'Football',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageSource: require('../../resources/preferences.png')
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={activitiesStyles.appbar}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack space={2} justifyContent="space-between" alignItems="center" mx="5" mt="5">
              <IconButton
                icon={<ThreeDotsIcon />}
                _icon={{ color: "violet.700", size: "md" }}
                _light={{
                  bg: "transparent"
                }}
                _pressed={{ bg: "transparent" }}
                onPress={() => alert('Button Pressed')}
              />
            </HStack>
            <HStack space={2} justifyContent="space-between" alignItems="center" mx="5" mt="5">
              <IconButton
                icon={<SearchIcon />}
                _icon={{ color: "violet.700", size: "md" }}
                _light={{
                  bg: "transparent"
                }}
                _pressed={{ bg: "transparent" }}
                onPress={() => alert('Button Pressed')}
              />
            </HStack>
          </HStack>
        </View>

        <View style={activitiesStyles.LabelContainer}>
          <Heading size="4xl">Activities</Heading>
        </View>

        <View style={activitiesStyles.activitiesContainer}>
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={activity.title}
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
