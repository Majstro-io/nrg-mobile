import { Dimensions } from 'react-native';
import { Box, Center, HStack, Image, ScrollView, Text, View, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import Footer from "../../components/footer/footer";
import RoundButton from '../../components/inputs/roundButton';

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
                <Box position="relative" height={height}>
                    <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.activities} title={"back"} />
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
                        bg="base.50"
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
                                        <RoundButton
                                            color={"base.500"}
                                            size={0.3}
                                            onPress={() => navigation.navigate(navigationconstants.PAGES.start, { id, activityName, image, description })}
                                            text={"Start"}
                                        />
                                    </HStack>
                                </VStack>
                            </VStack>
                        </Center>
                    </Box>
                </Box>
            </ScrollView>
            <View bg="base.50">
                <Footer />
            </View>
        </View>
    );
};

export default ActivityPage;
