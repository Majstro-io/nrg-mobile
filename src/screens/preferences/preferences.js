import React from "react";
import { Image, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import preferencesStyles from "./preferences.styles";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, CheckIcon, ChevronLeftIcon, FormControl, HStack, Heading, IconButton, Input, Select, VStack } from "native-base";


const preferences = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [voice, setVoice] = React.useState('');
    const [userTheme, setUserTheme] = React.useState('');


    return (
        <ScrollView style={[{ backgroundColor: theme.colors.background }]}>
            <View style={preferencesStyles.topicLabelContainer}>
                <HStack space={3} justifyContent="left" alignItems="center" mx="5">
                    <IconButton icon={<ChevronLeftIcon />}  _icon={{
                        color: "violet.700",
                        size: "md",              
                    }}
                    _pressed={{
                        bg: "transparent" 
                    }}
                    onPress={() => navigation.navigate('ContactDetails')}
                    />
                    <Heading size="xl">
                        Preferences Details
                    </Heading>
                </HStack>

            </View>
            <Center>
                <Image
                    source={require('../../resources/preferences.png')}
                    style={preferencesStyles.image}
                />
            </Center>

            <View style={preferencesStyles.InputContainer}>
                <FormControl isRequired>


                    <VStack space={4} mt="4" alignItems="center">
                        <VStack space={1}>
                            <FormControl.Label alignSelf="flex-start">Voice Preferences</FormControl.Label>
                            <Select
                                isReadOnly
                                selectedValue={voice}
                                onValueChange={voice => setVoice(voice)}
                                width="xs"
                                placeholder="Roy"
                                _selectedItem={{
                                    bg: "info.300",
                                    endIcon: <CheckIcon size="5" />
                                }}
                            >
                                <Select.Item label="Roy" value="Roy" />
                                <Select.Item label="Mark" value="Mark" />

                            </Select>
                        </VStack>

                        <VStack space={1}>
                            <FormControl.Label alignSelf="flex-start">Select Theme</FormControl.Label>
                            <Select
                                isReadOnly
                                selectedValue={userTheme}
                                onValueChange={userTheme => setUserTheme(userTheme)}
                                width="xs"
                                placeholder="Light"
                                _selectedItem={{
                                    bg: "info.300",
                                    endIcon: <CheckIcon size="5" />
                                }}
                            >
                                <Select.Item label="Light" value="Light" />
                                <Select.Item label="Dark" value="Dark" />

                            </Select>
                        </VStack>


                        <Button
                            mt={3}
                            style={preferencesStyles.button}
                            width="1/4"
                            onPress={() => navigation.navigate('Preferences')}>
                            Next
                        </Button>



                    </VStack>

                </FormControl>

            </View>
        </ScrollView>
    );
};

export default preferences;
