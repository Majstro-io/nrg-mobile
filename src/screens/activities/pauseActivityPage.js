import { useState } from "react";
import { Dimensions } from 'react-native';
import { Box, Center, Heading, HStack, IconButton, Image,  ScrollView, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import conversionUtils from "../../utils/conversionUtils";
import navigationconstants from "../../constants/navigationConstants";
import AleartModel from "../../components/modals/aleart";

import stop from "../../resources/playerIcons/stop.png";
import play from "../../resources/playerIcons/play.png";

const PauseActivityPage = ({ route }) => {
    const navigation = useNavigation();
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const { id, activityName, image, description, timer } = route.params;
    const { width, height } = Dimensions.get('window');

    const handleConfirm = () => {
        navigation.navigate(navigationconstants.PAGES.activity, { id, activityName, image, description });
    };

    return (

        <View style={{ flex: 1 }}  >
            <ScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
            >
                <Box position="relative" height={height}>
                    <Image
                        source={{ uri: image }}
                        size="100%"
                        height="400"
                        width="400"
                        position="absolute"
                        zIndex={-1}
                    />
                    <Box
                        top={300}
                        bg="yellow.100"
                        borderRadius={45}
                        width={width}
                        height={height / 1.5}
                    >

                        <Center padding={10}>
                            <VStack space={10} alignItems="center">
                                <HStack space={"48"} justifyContent="space-between" alignItems="center">
                                    {/* <Text fontSize="xl" textAlign="center"  >- -{`\n`}BPM</Text>
                                    <Text fontSize="xl" textAlign="center"  >- -{`\n`}Km</Text> */}
                                </HStack>
                                <Box alignItems="center">
                                    <Heading fontSize="7xl" mb="2">{conversionUtils.formatTime(timer)}</Heading >
                                    {/* <Progress
                                        width="72"
                                        value={timer}
                                        _filledTrack={{ bgColor: "black.800" }}
                                        bgColor="black.100"
                                        size="sm"
                                    />
                                    <HStack space={6} justifyContent="space-between" alignItems="center" mt={1}>
                                        <Text fontSize="xs" textAlign="center">0 km</Text>
                                        <Text fontSize="xs" textAlign="center">1 km</Text>
                                        <Text fontSize="xs" textAlign="center">2 km</Text>
                                        <Text fontSize="xs" textAlign="center">3 km</Text>
                                        <Text fontSize="xs" textAlign="center">4 km</Text>
                                        <Text fontSize="xs" textAlign="center">5 km</Text>
                                    </HStack> */}
                                </Box>
                                <HStack justifyContent="space-between" alignItems="center" space={20} mt={2}>
                                    <IconButton
                                        icon={
                                            <Image
                                                source={stop}
                                                alt="Custom Icon"
                                                size="20"
                                            />
                                        }
                                        bgColor="black.800"
                                        _pressed={{ bgColor: "black.800" }}
                                        size="24"
                                        width="24"
                                        rounded="full"
                                        onPress={() => setIsErrorModalVisible(true)}
                                        _text={{ fontSize: '4xl' }}
                                    />

                                    <IconButton
                                        icon={
                                            <Image
                                                source={play}
                                                alt="Custom Icon"
                                                size="20"
                                            />
                                        }
                                        bgColor="yellow.500"
                                        _pressed={{ bgColor: "yellow.500" }}
                                        size="24"
                                        width="24"
                                        rounded="full"
                                        onPress={() => navigation.navigate(navigationconstants.PAGES.start, { id, activityName, image, description })}
                                        _text={{ fontSize: '4xl' }}
                                    />
                                </HStack>
                            </VStack>
                        </Center>
                    </Box>
                </Box>
            </ScrollView>

            {isErrorModalVisible && (
                <AleartModel
                    errorTitle="Are you sure you want to stop the activity"
                    errorDescription="Please confirm if you need to stop the activity and move to home page."
                    visible={isErrorModalVisible}
                    setVisible={setIsErrorModalVisible}
                    onConfirm={handleConfirm}
                />
            )}
        </View>
    );
};

export default PauseActivityPage;
