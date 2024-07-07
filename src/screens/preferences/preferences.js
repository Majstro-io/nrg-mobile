import React, { useEffect } from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, Center, CheckIcon, FormControl, Select, VStack } from "native-base";

import { useTheme } from "../../styles/ThemeContext";
import preferencesStyles from "./preferences.styles";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";

import assistantOptions from "../../data/assistantOptions.json"
import userPreferences from "../../data/userPreferences.json"

const Preferences = () => {
  const navigation = useNavigation();
  const { theme, setTheme } = useTheme();

  const [voice, setVoice] = React.useState({});
  const [userTheme, setUserTheme] = React.useState(theme);

  const handleThemeChange = (newTheme) => {
    setUserTheme(newTheme);
    setTheme(newTheme);
  };

  const getSelectedAssistant = () => {
    const assistant = assistantOptions.content.assistants.find(assistant => assistant.id == userPreferences.assistant)
    setVoice(assistant.id)
  }

  useEffect(() => {
    getSelectedAssistant()
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.activities} title={"Preferences"} />
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
                  defaultValue={voice}
                  selectedValue={voice}
                  onValueChange={setVoice}
                  width="xs"
                  isReadOnly
                  placeholder="Select Voice Preference"
                  _selectedItem={{
                    bg: "info.300",
                    endIcon: <CheckIcon size="5" />
                  }}
                >
                  {assistantOptions.content.assistants.map(assistant => {
                    return <Select.Item label={assistant.name} value={assistant.id} key={assistant.id} />
                  })}
                </Select>
              </VStack>
              <VStack space={1}>
                <FormControl.Label alignSelf="flex-start">Select Theme</FormControl.Label>
                <Select
                  selectedValue={userTheme}
                  onValueChange={handleThemeChange}
                  width="xs"
                  placeholder="Theme"
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
                Save
              </Button>
            </VStack>
          </FormControl>
        </View>
      </ScrollView>
    </View>
  );
};

export default Preferences;
