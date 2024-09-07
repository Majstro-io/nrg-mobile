import { Dimensions } from 'react-native';
import { Box, Button, Center, HStack, Image, ScrollView, Text, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import Footer from "../../components/footer/footer";

const ActivityPage = ({ route }) => {
    const navigation = useNavigation();
    const { id, activityName, image, description } = route.params;
    const { width, height } = Dimensions.get('window');

    return (

        <View style={{ flex: 1 }}>
            <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.activities} title={"back"} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
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
                        alt="Activity Image"
                    />
                    <Box
                        top={250}
                        bg="yellow.100"
                        borderTopRadius={45}
                        width={width}
                        height={height}
                    >
                        <Center padding={10}>
                            <VStack space={5} alignItems="center">
                                <Text fontSize="2xl" >{activityName}</Text>
                                <VStack space={5} alignItems="center">
                                    <Text mb={2} fontSize="sm" textAlign="center" lineHeight="xs">{description}</Text>
                                    <HStack justifyContent="center" alignItems="center" >
                                        <Button
                                            bgColor="yellow.500"
                                            size="32"
                                            width="32"
                                            rounded="full"
                                            onPress={() => navigation.navigate(navigationconstants.PAGES.start, { id, activityName, image, description })}
                                            _text={{ fontSize: '3xl', color: 'black.800' }}
                                        >
                                            Start
                                        </Button>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </Center>
                    </Box>
                </Box>
            </ScrollView>
            <View bg="yellow.100">
                <Footer />
            </View>
        </View>
    );
};

export default ActivityPage;
