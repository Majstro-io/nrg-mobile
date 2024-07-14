import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, Center, CheckIcon, FormControl, Select, VStack, Image } from "native-base";

import { useTheme } from "../../styles/ThemeContext";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import mappingUtils from "../../utils/mappingUtils";

import assistantOptions from "../../data/assistantOptions.json"
import activities from "../../data/activities.json"
import { updateTheme } from "../../store/slices/userPreferencesSlice";
import SelectFavouritesModal from "../../components/preferences/selectFavouritesModal";

const Preferences = () => {
  const navigation = useNavigation();
  const { setTheme } = useTheme();
  const userPreferences = useSelector((state) => state.userPreferences);
  const dispatch = useDispatch();


  const [voice, setVoice] = React.useState({});

  const handleThemeChange = (selectedTheme) => {
    dispatch(updateTheme(selectedTheme))
    setTheme(selectedTheme);
  };

  const getSelectedAssistant = () => {
    const assistant = assistantOptions.content.assistants.find(assistant => assistant.id == userPreferences.assistant)
    setVoice(assistant.id)
  }

  useEffect(() => {
    getSelectedAssistant()
  }, [])

  useEffect(() => {
    getSelectedAssistant()
  }, [userPreferences.favourites])


  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.activities} title={"Preferences"} />
        <Center>
          <Image
            alt="preferencesIconImage"
            resizeMode="contain"
            source={require('../../resources/preferences.png')}
          />
        </Center>
        <View>
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
                  selectedValue={userPreferences.theme}
                  onValueChange={handleThemeChange}
                  width="xs"
                  placeholder="Theme"
                  isReadOnly
                  _selectedItem={{
                    endIcon: <CheckIcon size="5" />
                  }}
                >
                  <Select.Item label="Light" value="light" />
                  <Select.Item label="Dark" value="dark" />
                </Select>
              </VStack>
              <VStack space={1}>
                <FormControl.Label alignSelf="flex-start">Favourite Activities</FormControl.Label>
                <SelectFavouritesModal />
              </VStack>
              <Button
                mt={3}
                width="1/4"
                marginBottom={"1/6"}
                marginTop={"1/6"}
                onPress={() => navigation.navigate(navigationconstants.PAGES.activities)}>
                Done
              </Button>
            </VStack>
          </FormControl>
        </View>
      </ScrollView>
    </View>
  );
};

export default Preferences;
