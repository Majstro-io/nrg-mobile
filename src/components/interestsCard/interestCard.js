import { Box, CheckCircleIcon, HStack, Image, Pressable, Text } from 'native-base';
import React from 'react';
import blackFade from '../../resources/blackFade.png';

const InterestCard = ({ name, imageSource, onPress, select }) => {
  return (
    <Box
      rounded="2xl"
      overflow="hidden"
      maxW="96"
      width="175px"
      height="120px"
      bg="white"
      borderRadius={15}
      borderWidth={select ? 3 : 0}
      borderColor={select ? "blue.500" : "transparent"}
      position="relative"
      bgColor={select ? "black.50" : "transparent"}
    >
      <Pressable
        rounded="2xl"
        overflow="auto"
        onPress={onPress}
      >
        <Box
          width="100%"
          height="100%"
          position="relative"
        >

          <Image
            source={blackFade}
            alt="Black Fade"
            style={{ width: '100%', height: '100%', opacity: select ? 0.2 : 1 }}  
            resizeMode="stretch"
            position="absolute"
            top={0}
            left={0}
            zIndex={1}
          />

          {/* Main image */}
          <Image
            source={{ uri: imageSource }}
            alt="Activity Image"
            style={{ width: '100%', height: '100%', opacity: select ? 0.2 : 1 }} 
            resizeMode="cover"
            position="absolute"
            top={0}
            left={0}
            zIndex={0}
          />

          {select && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgColor="black"
              opacity={0.3} 
              zIndex={2}
            />
          )}

      <Box
        position="absolute"
        bottom="0"
        width="100%"
        zIndex={3}
      >
        <HStack
          space={4}
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Text fontSize="md" mb={2} mx={1} color={select ? "black.800" : "black.10"}>
            {name}
          </Text>
        </HStack>
      </Box>

      {select && (
        <Box
          position="absolute"
          top="2"
          right="2"
          zIndex="4"
        >
          <CheckCircleIcon size="6" color="blue.500" />
        </Box>
      )}
        </Box>
      </Pressable>
    </Box>
  );
};

export default InterestCard;
