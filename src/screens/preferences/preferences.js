import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, Center, CheckIcon, ChevronLeftIcon, FormControl, HStack, Heading, IconButton, Input, Select, VStack } from "native-base";
import { useTheme } from "../../styles/ThemeContext";
import preferencesStyles from "./preferences.styles";

const Preferences = () => {
  const navigation = useNavigation();
  const { theme, setTheme } = useTheme();

  const [voice, setVoice] = React.useState('');
  const [userTheme, setUserTheme] = React.useState(theme);

  const handleThemeChange = (newTheme) => {
    setUserTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={preferencesStyles.topicLabelContainer}>
          <HStack space={3} justifyContent="left" alignItems="center" mx="5">
            <IconButton icon={<ChevronLeftIcon />} _icon={{
              color: "violet.700",
              size: "md",
            }}
              _pressed={{
                bg: "transparent"
              }}
              _light={{
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
                  selectedValue={voice}
                  onValueChange={setVoice}
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
                  selectedValue={userTheme}
                  onValueChange={handleThemeChange}
                  width="xs"
                  placeholder="Light"
                  isReadOnly
                  _selectedItem={{
                    bg: "info.300",
                    endIcon: <CheckIcon size="5" />
                  }}
                >
                  <Select.Item label="Light" value="light" />
                  <Select.Item label="Dark" value="dark" />
                </Select>
              </VStack>
              <Button
                mt={3}
                style={preferencesStyles.button}
                width="1/4"
                onPress={() => navigation.navigate('Activities')}>
                Next
              </Button>
            </VStack>
          </FormControl>
        </View>
      </ScrollView>
    </View>
  );
};

export default Preferences;
