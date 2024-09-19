import React from 'react';
import { Box, Center, HStack, IconButton, Image, NativeBaseProvider, Pressable, Text, View, } from 'native-base';
import { useNavigation, useRoute } from "@react-navigation/native";

import navigationconstants from '../../constants/navigationConstants';
import notificationIcon from '../../resources/footerIcons/notification.png';
import recentsIcon from '../../resources/footerIcons/recent.png';
import profile from '../../resources/footerIcons/profile.png';
import home from '../../resources/footerIcons/home.png';
import preferences from '../../resources/footerIcons/preferences.png';
import ComingSoonModal from '../modals/comingSoonModal';

const BottomNavigator = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [isComingSoonModalVisible, setIsComingSoonModalVisible] = React.useState(false);

    return (
        <>
            <ComingSoonModal setVisible={setIsComingSoonModalVisible} visible={isComingSoonModalVisible} />
            <View
                position="absolute"
                bottom="1"
                alignSelf={'center'}
                width={'98%'}
                bg="transparent"
                safeAreaBottom
            >
                <NativeBaseProvider>
                    <Box>
                        <HStack borderRadius={10} bg="#0F1511" alignItems="center" >
                            <Pressable py="3" flex={1}>
                                <Center>
                                    <IconButton
                                        mb={-1}
                                        icon={
                                            <Image
                                                source={recentsIcon}
                                                alt="History"
                                                size="2xs"
                                                tintColor={"text.600"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => setIsComingSoonModalVisible(true)}
                                    />
                                    <Text color={"text.600"} fontSize="xs">
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
                                                tintColor={"text.600"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => setIsComingSoonModalVisible(true)}
                                    />
                                    <Text color={"text.600"} fontSize="xs">
                                        Notifications
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable borderRadius={"full"} height={'100%'} bgColor={route.name == navigationconstants.PAGES.activities ? 'white' : "#99FE00"} py="2" flex={1.2}>
                                <Center >
                                    <IconButton
                                        mb={-1}
                                        icon={
                                            <Image
                                                source={home}
                                                alt="Home Icon"
                                                size="2xs"
                                                tintColor={route.name == navigationconstants.PAGES.activities ? 'text.600' : "text.600"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => navigation.navigate(navigationconstants.PAGES.activities)}
                                    />
                                    <Text color={route.name == navigationconstants.PAGES.activities ? 'text.600' : "text.600"} fontSize="xs">
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
                                                tintColor={route.name == navigationconstants.PAGES.preferences ? 'text.100' : "text.600"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => navigation.navigate(navigationconstants.PAGES.preferences)}
                                    />
                                    <Text color={route.name == navigationconstants.PAGES.preferences ? 'text.100' : "text.600"} fontSize="xs">
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
                                                tintColor={route.name == navigationconstants.PAGES.updatePersonalDetails ? 'text.100' : "text.600"}
                                            />
                                        }
                                        _pressed={{
                                            bgColor: "transparent",
                                        }}
                                        bgColor="transparent"
                                        onPress={() => navigation.navigate(navigationconstants.PAGES.updatePersonalDetails)}
                                    />
                                    <Text color={route.name == navigationconstants.PAGES.updatePersonalDetails ? 'text.100' : "text.600"} fontSize="xs">
                                        Profile
                                    </Text>
                                </Center>
                            </Pressable>
                        </HStack>
                    </Box>
                </NativeBaseProvider>
            </View>
        </>

    );
};

export default BottomNavigator;
