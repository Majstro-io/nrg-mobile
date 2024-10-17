import { Dimensions } from 'react-native';
import { Box, Center, Heading, HStack, Image, ScrollView, Text, View, VStack } from "native-base";
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
                <Box position="relative" minHeight={height}>
                    <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.activities} title={"BACK"} />
                    <Image
                        source={{ uri: image }}
                        size="100%"
                        height="60%"
                        width="100%"
                        position="absolute"
                        zIndex={-1}
                        alt="Activity Image"
                    />
                    <Box
                        top={250}
                        bg="background.200"
                        borderTopRadius={45}
                        minWidth={width}
                        minHeight={height}
                    >
                        <Center padding={10}>
                            <VStack space={5} alignItems="center">
                                <Heading fontSize="4xl" textAlign="center" >{activityName}</Heading>
                                <VStack space={5} alignItems="center">
                                    <Text mb={2} fontSize="md" letterSpacing={0.8} textAlign="center" lineHeight="xs">{description}</Text>
                                    <HStack justifyContent="center" alignItems="center" >
                                        <RoundButton
                                            color={"base.500"}
                                            size={0.3}
                                            onPress={() => navigation.navigate(navigationconstants.PAGES.start, { id, activityName, image, description })}
                                            text={"START"}
                                        />
                                    </HStack>
                                </VStack>
                            </VStack>
                        </Center>
                    </Box>
                </Box>
            </ScrollView>
            <BottomNavigator />
        </View>
    );
};

export default ActivityPage;
