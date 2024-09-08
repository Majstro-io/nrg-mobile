import { Box, FavouriteIcon, HStack, IconButton, Image, Pressable, Text } from 'native-base';
import React, { useEffect, useState } from 'react';

import preferences from "../../data/updatedPreferences.json"

const ActivityCard = ({ activityId, title, imageSource, onPress, style, hStackBgColor }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(preferences.favourites.some(favourite => favourite.id === activityId));
  },[])

  return (
    <Box
      mb={1}
      rounded="2xl"
      overflow="hidden"
      maxW="96"
      p="1"
      width="175px"
      height="150px"
      bg="white"
    >
      <Pressable
        rounded="2xl"
        onPress={onPress}
        overflow="hidden"
        style={style}
      >
        <Box
          width="100%"
          height="100%"
          position="relative"
        >
          <Image
            source={{ uri: imageSource }}
            alt="Activity Image"
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <Box
            position="absolute"
            bottom="0"
            width="100%"
            bg={hStackBgColor}
            padding={2}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="md" mb={2} flex={0.9}>
                {title}
              </Text>
              <IconButton
                padding={2}
                icon={<FavouriteIcon size="sm" />}
                onPress={null}
                colorScheme={isFavourite ? "red" : "gray"}
                flex={0.1}
              />
            </HStack>
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ActivityCard;
