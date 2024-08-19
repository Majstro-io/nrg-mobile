import { Box, HStack, IconButton, Image, Text, VStack } from 'native-base';
import footerImage from '../../resources/footer.png';
import walk from '../../resources/footerIcons/walking.png';
import sprint from '../../resources/footerIcons/sprint.png';
import profile from '../../resources/footerIcons/profile.png';
import home from '../../resources/footerIcons/home.png';
import running from '../../resources/footerIcons/running.png';
import { useNavigation } from "@react-navigation/native";
import navigationconstants from '../../constants/navigationConstants';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <Box>
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
                padding={2}
                space={8}
            >
                <VStack alignItems="center">
                    <IconButton
                        mb={-1}
                        icon={
                            <Image
                                source={walk}
                                alt="Walk Icon"
                                size="7"
                            />
                        }
                        _pressed={{
                            bgColor: "transparent",
                        }}
                        bgColor="transparent"
                        onPress={() => navigation.navigate(navigationconstants.PAGES.activities)}
                    />
                    <Text fontSize="xs">Walk</Text>
                </VStack>
                <VStack alignItems="center">
                    <IconButton
                        mb={-1}
                        icon={
                            <Image
                                source={running}
                                alt="Run Icon"
                                size="7"
                            />
                        }
                        _pressed={{
                            bgColor: "transparent",
                        }}
                        bgColor="transparent"
                        onPress={() => navigation.navigate(navigationconstants.PAGES.activities)}
                    />
                    <Text fontSize="xs">Run</Text>
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
                                source={sprint}
                                alt="Sprint Icon"
                                size="7"
                            />
                        }
                        _pressed={{
                            bgColor: "transparent",
                        }}
                        bgColor="transparent"
                        onPress={() => navigation.navigate(navigationconstants.PAGES.activities)}
                    />
                    <Text fontSize="xs">Sprint</Text>
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
    );
};

export default Footer;
