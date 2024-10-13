import React from 'react';
import { Box, Center, HStack, IconButton, Image, KeyboardAvoidingView, NativeBaseProvider, Pressable, Text, View, } from 'native-base';
import { useNavigation, useRoute } from "@react-navigation/native";

import navigationconstants from '../../constants/navigationConstants';
import notificationIcon from '../../resources/footerIcons/notification.png';
import recentsIcon from '../../resources/footerIcons/recent.png';
import profile from '../../resources/footerIcons/profile.png';
import home from '../../resources/footerIcons/home.png';
import preferences from '../../resources/footerIcons/preferences.png';
import ComingSoonModal from '../modals/comingSoonModal';
import colorConstants from '../../constants/colorConstants';

const BottomNavigator = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [isComingSoonModalVisible, setIsComingSoonModalVisible] = React.useState(false);

    return (
        <View >
            <ComingSoonModal setVisible={setIsComingSoonModalVisible} visible={isComingSoonModalVisible} />
            <NativeBaseProvider>
                <View
                    position="absolute"
                    bottom="1"
                    alignSelf={'center'}
                    width={'98%'}
                    bg="transparent"
                    safeAreaBottom
                >
                    <Box avoidKeyboard >
                        <HStack borderRadius={10} bg={colorConstants.card} alignItems="center" >
                            <Pressable py="3" flex={1}>
                                <Center>
                                    <IconButton
                                        mb={-1}
                                        icon={
                                            <Image
                                                source={recentsIcon}
                                                alt="History"
                                                size="2xs"
                                                tintColor={"text.100"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => setIsComingSoonModalVisible(true)}
                                    />
                                    <Text color={"text.100"} fontSize="xs">
                                        History
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable py="3" flex={1}>
                                <Center>
                                    <IconButton
                                        mb={-1}
                                        icon={
                                            <Image
                                                source={notificationIcon}
                                                alt="Notifications"
                                                size="2xs"
                                                tintColor={"text.100"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => setIsComingSoonModalVisible(true)}
                                    />
                                    <Text color={"text.100"} fontSize="xs">
                                        Notifications
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable borderRadius={"full"} height={'110%'} bgColor={route.name != navigationconstants.PAGES.activities ? 'white' : colorConstants.base} py="2" flex={1.2}>
                                <Center >
                                    <IconButton
                                        mb={-1}
                                        icon={
                                            <Image
                                                source={home}
                                                alt="Home Icon"
                                                size="2xs"
                                                tintColor={route.name == navigationconstants.PAGES.activities ? 'text.900' : "text.600"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => navigation.navigate(navigationconstants.PAGES.activities)}
                                    />
                                    <Text color={route.name == navigationconstants.PAGES.activities ? 'text.900' : "text.600"} fontSize="xs">
                                        Home
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable py="2" flex={1} >
                                <Center>
                                    <IconButton
                                        mb={-1}
                                        icon={
                                            <Image
                                                source={preferences}
                                                alt="Preferences"
                                                size="2xs"
                                                tintColor={route.name == navigationconstants.PAGES.preferences ? colorConstants.base : "text.100"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => navigation.navigate(navigationconstants.PAGES.preferences)}
                                    />
                                    <Text color={route.name == navigationconstants.PAGES.preferences ? colorConstants.base : "text.100"} fontSize="xs">
                                        Preferences
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable py="2" flex={1} >
                                <Center>
                                    <IconButton
                                        mb={-1}
                                        icon={
                                            <Image
                                                source={profile}
                                                alt="Profile"
                                                size="2xs"
                                                tintColor={route.name == navigationconstants.PAGES.updatePersonalDetails ? colorConstants.base : "text.100"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => navigation.navigate(navigationconstants.PAGES.updatePersonalDetails)}
                                    />
                                    <Text color={route.name == navigationconstants.PAGES.updatePersonalDetails ? colorConstants.base : "text.100"} fontSize="xs">
                                        Profile
                                    </Text>
                                </Center>
                            </Pressable>
                        </HStack>
                    </Box>
                </View>
            </NativeBaseProvider>
        </View>


    );
};

export default BottomNavigator;
