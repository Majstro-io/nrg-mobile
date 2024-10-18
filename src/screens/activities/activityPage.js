import { Dimensions } from 'react-native';
import { Box, Button, Center, Heading, HStack, Image, ScrollView, Text, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import RoundButton from '../../components/inputs/roundButton';
import BottomNavigator from '../../components/footer/bottomNavigation';

const ActivityPage = ({ route }) => {
    const navigation = useNavigation();
    const { id, activityName, image, description } = route.params;
    const { width, height } = Dimensions.get('window');

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <Box position="relative" minHeight={height} flex={1}>
                    <VStack flex={1} space={4} padding={5} bg="gray.900">
                        <Box borderRadius="xl" p={0}>
                            <NrgTitleAppBar
                                backNavigateTo={navigationconstants.PAGES.activities}
                                title={"BACK"}
                                iconColor={'primary.100'}
                                fontColor={"text.100"}
                                position="absolute"
                            />
                        </Box>
                        <Box bg="gray.800" borderRadius="xl" overflow="hidden" position="relative" height={200}>
                            <Image
                                source={{ uri: image }}
                                alt="Activity Image"
                                height="100%"
                                width="100%"
                                resizeMode="cover"
                                position="absolute"
                                zIndex={-1}
                            />
                        </Box>
                        <Box bg="gray.800" borderRadius="lg" p={5} flex={0.5}>
                            <VStack space={3} alignItems="center" flex={1}>
                                <Heading fontSize="3xl" textAlign="center">{activityName}</Heading>
                                <Text  mb={2} fontSize="md" letterSpacing={0.8} textAlign="center" lineHeight="xs">{description}</Text>
                                <Box flex={0.8} />
                                <RoundButton
                                    color={"base.500"}
                                    size={0.3}
                                    onPress={() => navigation.navigate(navigationconstants.PAGES.start, { id, activityName, image, description })}
                                    text={"START"}
                                />
                            </VStack>
                        </Box>
                        
                    </VStack>
                </Box>
            </ScrollView>
        </View>
    );
};

export default ActivityPage;
