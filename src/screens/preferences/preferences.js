import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, Center, CheckIcon, FormControl, Select, VStack, Image } from "native-base";

import { useTheme } from "../../styles/ThemeContext";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";

import assistantOptions from "../../data/assistantOptions.json"
import { setAssistantVoice, setPreferences, updateTheme } from "../../store/slices/userPreferencesSlice";
import SelectFavouritesModal from "../../components/modals/selectFavouritesModal";
import userPreferencesService from "../../services/userPreferencesService";
import log from "../../config/logger";
import ErrorModal from "../../components/modals/errorModal";

const Preferences = () => {
  const navigation = useNavigation();
  const { setTheme } = useTheme();

  const userPreferences = useSelector((state) => state.userPreferences);
  const userData = useSelector((state) => state.userData.data);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const [errorModalVisible, setErrorModalVisible] = React.useState(false)
  const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in fetching user preferences")
  const [errorModalTitle, setErrorModalTitle] = React.useState("Fetching Activities Failed")


  const handleThemeChange = (selectedTheme) => {
    dispatch(updateTheme(selectedTheme))
    setTheme(selectedTheme);
  };

  const fetchUserPreferences = () => {
    setLoading(true)
    userPreferencesService.getUserPreferenceData(userData?.id).then(res => {
      dispatch(setPreferences(res.data))
    }).catch(error => {
      setErrorModalText("Failed to fetch user preferences, please try reloading")
      setErrorModalTitle("Failed to fetch preferences")
      setErrorModalVisible(true)
      log.error("Error in fetching user preferences from preferences page", error)
    }).finally(() => {
      setLoading(false)
    })
  }

  const updateUserPreferences = async () => {
    const preferenceData = {
      preferedActivities: userPreferences.favourites,
      voice: userPreferences.assistant,
      theme: userPreferences.theme
    }
    setLoading(true)
    await userPreferencesService.updateUserPreference(userPreferences?.id, preferenceData).then(res => {
      dispatch(setPreferences(res.data))
      navigation.navigate(navigationconstants.PAGES.activities)
    }).catch(error => {
      setErrorModalText("Failed to update user preferences, please retry")
      setErrorModalTitle("Failed to update preferences")
      setErrorModalVisible(true)
      log.error("Error in updating user preferences from preferences page", error)
    }).finally(() => {
      setLoading(false)
    })
  }

  const handleOnDone = async () => {
    await updateUserPreferences();
  }

  useEffect(() => {
    fetchUserPreferences();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ErrorModal
        errorDescription={errorModalText}
        errorTitle={errorModalTitle}
        setVisible={setErrorModalVisible}
        visible={errorModalVisible}
      />
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
                  defaultValue={userPreferences.assistant}
                  selectedValue={userPreferences.assistant}
                  onValueChange={(value) => dispatch(setAssistantVoice(value))}
                  width="xs"
                  isReadOnly
                  placeholder="Select Voice Preference"
                  _selectedItem={{
                    endIcon: <CheckIcon size="5" />
                  }}
                >
                  {assistantOptions.content.assistants.map(assistant => {
                    return <Select.Item label={assistant?.name} value={assistant?.id} key={assistant?.id} />
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
                onPress={() => handleOnDone()}
                isLoading={loading}
              >
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
