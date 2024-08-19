import { Box, HStack, Image, Pressable, Text } from 'native-base';
import React from 'react';

const ActivityCard = ({ title, imageSource, onPress, style, hStackBgColor }) => {
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
          >
            <HStack
              space={4}
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
              <Text fontSize="xl" mb={2}>
                {title}
              </Text>
            </HStack>

          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ActivityCard;
