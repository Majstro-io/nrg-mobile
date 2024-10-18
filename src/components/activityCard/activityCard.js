import { Box, FavouriteIcon, HStack, IconButton, Image, Pressable, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';

import { addUserFavouriteActivity } from '../../store/slices/userPreferencesSlice';

const ActivityCard = ({ activityId, title, imageSource, onPress, style, hStackBgColor, cardWidth = 0.45, cardHeight = 0.20 }) => {
  const dispatch = useDispatch()
  const userPreferences = useSelector((state) => state.userPreferences);

  const [isFavourite, setIsFavourite] = useState(false);

  const { width, height } = Dimensions.get('window');
  const boxWidth = width * cardWidth;
  const boxHeight = height * cardHeight;

  useEffect(() => {
    setIsFavourite(userPreferences?.favouriteIds?.some(favourite => favourite === activityId));
  }, [userPreferences?.favouriteIds])

  return (
    <Box
      mb={1}
      rounded="2xl"
      overflow="hidden"
      p="1"
      width={`${boxWidth}px`}
      height={`${boxHeight}px`}
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
              <Text color={'text.100'} fontStyle={'medium'} fontSize="md" mb={2} flex={0.9} isTruncated>
                {title}
              </Text>
              <IconButton
                padding={2}
                icon={<FavouriteIcon size="sm" />}
                onPress={() => dispatch(addUserFavouriteActivity(activityId))}
                colorScheme={isFavourite ? "base" : "gray"}
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
