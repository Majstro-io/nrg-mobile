import { Box, ChevronRightIcon, Flex, HStack, Heading, Image, Pressable,Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import activityCardStyles from "./activityCard.styles";
import { useNavigation } from '@react-navigation/native';

const ActivityCard = ({title, description, imageSource}) => {
  const navigation = useNavigation();

  return (
    <View key="activity-card">
      <Box alignItems="center" mt={4}>
        <Pressable
          onPress={() => navigation.navigate(`${title}`)}
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
                <ChevronRightIcon color="violet.700"/>
              </HStack>

            </HStack>

            <Flex>
              <HStack space={1} justifyContent="space-between" alignItems="center">
                <Text w="40" fontSize="sm">
                  {description}
                </Text>
                <Image
                  source={imageSource}
                  alt={`${title} Image`}
                  style={activityCardStyles.image}
                />
              </HStack>
            </Flex>
          </Box>
        </Pressable>
      </Box>
    </View>
  );
};

export default ActivityCard;
