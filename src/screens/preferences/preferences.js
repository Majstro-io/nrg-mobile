import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, Center, CheckIcon, FormControl, Select, VStack } from "native-base";

import { useTheme } from "../../styles/ThemeContext";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import TagGroup from "../../components/preferences/tagGroup";
import mappingUtils from "../../utils/mappingUtils";

import assistantOptions from "../../data/assistantOptions.json"
import activities from "../../data/activities.json"
import { addUserFavouriteActivity, updateTheme } from "../../store/slices/userPreferencesSlice";

const Preferences = () => {
  const navigation = useNavigation();
  const { setTheme } = useTheme();
  const userPreferences = useSelector((state) => state.userPreferences);
  const dispatch = useDispatch();


  const [voice, setVoice] = React.useState({});
  const [mappedFavourites, setMappedFavourites] = React.useState([]);

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
    const mapped = mappingUtils.mapFavouritesWithActivities(activities.content, userPreferences.favourites).map(item => item.activityName)
    setMappedFavourites(mapped)
  }, [userPreferences.favourites])


  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.activities} title={"Preferences"} />
        <Center>
          <Image
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
                <Select
                  style={{ backgroundColor: "info.300" }}
                  onValueChange={(value) => dispatch(addUserFavouriteActivity({ activityId: value }))}
                  width="xs"
                  placeholder="Activity"
                  isReadOnly
                  _selectedItem={{
                    endIcon: <CheckIcon size="5" />
                  }}
                >
                  {activities.content.map(activity => {
                    return <Select.Item label={activity.name} value={activity.id} key={activity.id} />
                  })}
                </Select>
              </VStack>
              <VStack>
                <TagGroup tagList={mappedFavourites} />
              </VStack>
              <Button
                mt={3}
                width="1/4"
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
