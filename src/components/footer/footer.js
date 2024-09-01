import React from 'react';
import { Box, HStack, IconButton, Image, Text, VStack } from 'native-base';
import { useNavigation } from "@react-navigation/native";

import navigationconstants from '../../constants/navigationConstants';
import footerImage from '../../resources/footer.png';
import notificationIcon from '../../resources/footerIcons/notification.png';
import recentsIcon from '../../resources/footerIcons/recent.png';
import profile from '../../resources/footerIcons/profile.png';
import home from '../../resources/footerIcons/home.png';
import playlist from '../../resources/footerIcons/playlist.png';
import ComingSoonModal from '../modals/comingSoonModal';

const Footer = () => {
    const navigation = useNavigation();
    const [isComingSoonModalVisible, setIsComingSoonModalVisible] = React.useState(false);
    return (
        <>
            <ComingSoonModal setVisible={setIsComingSoonModalVisible} visible={isComingSoonModalVisible} />
            <Box >
                <Image
                    source={footerImage}
                    alt="Footer Image"
                />
                <HStack
                    position="absolute"
                    left={0}
                    right={1.5}
                    justifyContent="center"
                    alignItems="center"
                    space={8}
                    mt={2}
                >
                    <VStack alignItems="center">
                        <IconButton
                            mb={-1}
                            icon={
                                <Image
                                    source={playlist}
                                    alt="Playlist"
                                    size="7"
                                />
                            }
                            _pressed={{
                                bgColor: "transparent",
                            }}
                            bgColor="transparent"
                            onPress={() => setIsComingSoonModalVisible(true)}
                        />
                        <Text fontSize="xs">Library</Text>
                    </VStack>
                    <VStack alignItems="center">
                        <IconButton
                            mb={-1}
                            icon={
                                <Image
                                    source={recentsIcon}
                                    alt="Recent"
                                    size="7"
                                />
                            }
                            _pressed={{
                                bgColor: "transparent",
                            }}
                            bgColor="transparent"
                            onPress={() => setIsComingSoonModalVisible(true)}
                        />
                        <Text fontSize="xs">History</Text>
                    </VStack>
                    <VStack alignItems="center" mb={5} space={2}>
                        <IconButton
                            mb={-1}
                            icon={
                                <Image
                                    source={home}
                                    alt="Home Icon"
                                    size="7"
                                />
                            }
                            _pressed={{
                                bgColor: "transparent",
                            }}
                            bgColor="transparent"
                            onPress={() => navigation.navigate(navigationconstants.PAGES.activities)}
                        />
                        <Text fontSize="xs">Home</Text>
                    </VStack>
                    <VStack alignItems="center">
                        <IconButton
                            mb={-1}
                            icon={
                                <Image
                                    source={notificationIcon}
                                    alt="Notifications"
                                    size="7"
                                />
                            }
                            _pressed={{
                                bgColor: "transparent",
                            }}
                            bgColor="transparent"
                            onPress={() => setIsComingSoonModalVisible(true)}
                        />
                        <Text fontSize="xs">Alerts</Text>
                    </VStack>
                    <VStack alignItems="center">
                        <IconButton
                            mb={-1}
                            icon={
                                <Image
                                    source={profile}
                                    alt="Profile Icon"
                                    size="7"
                                />
                            }
                            _pressed={{
                                bgColor: "transparent",
                            }}
                            bgColor="transparent"
                            onPress={() => navigation.navigate(navigationconstants.PAGES.preferences)}
                        />
                        <Text fontSize="xs">Profile</Text>
                    </VStack>
                </HStack>
            </Box>
        </>

    );
};

export default Footer;
