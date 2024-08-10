import { Box, ChevronRightIcon, Flex, HStack, Image, Pressable, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';

const ActivityCard = ({ title, description, imageSource, onPress, style }) => {

  return (
    <View>
      <Box alignItems="center" mt={4}>
        <Pressable
          style={style}
          onPress={onPress}
          rounded="8"
          overflow="hidden"
          borderWidth="1"
          maxW="96"
          p="5"
          width="90%"
        >
          <Box>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space={2} justifyContent="space-between" alignItems="center" >
                <Text fontSize="3xl" mb={2}>
                  {title}
                </Text>
              </HStack>
              <HStack space={2} justifyContent="space-between" alignItems="center" >
                <ChevronRightIcon color="primary.700" />
              </HStack>

            </HStack>

            <Flex>
              <HStack space={1} justifyContent="space-between" alignItems="center">
                {description && <Text w="40" fontSize="sm">
                  {description}
                </Text>}
                {imageSource && <Image
                  source={{ uri: imageSource }}
                  alt={`${title} Image`}
                  width={125}
                  height={125}
                />}
              </HStack>
            </Flex>
          </Box>
        </Pressable>
      </Box>
    </View>
  );
};

export default ActivityCard;
