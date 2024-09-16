import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Button, Center, CheckIcon, Select, VStack, Text, Box, Progress, HStack, Input, } from "native-base";

import { useTheme } from "../../styles/ThemeContext";
import navigationconstants from "../../constants/navigationConstants";
import { setAssistantVoice, setPreferences, updateTheme } from "../../store/slices/userPreferencesSlice";
import userPreferencesService from "../../services/userPreferencesService";
import log from "../../config/logger";
import ErrorModal from "../../components/modals/errorModal";
import assistantOptions from "../../data/assistantOptions.json"
import NrgHeader from "../../components/header/nrgHeader";

const Preferences = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const { setTheme } = useTheme();

  const userPreferences = useSelector((state) => state.userPreferences);

  const [loading, setLoading] = React.useState(false);

  const [errorModalVisible, setErrorModalVisible] = React.useState(false)
  const [errorModalText, setErrorModalText] = React.useState("We have encountered an error in fetching user preferences")
  const [errorModalTitle, setErrorModalTitle] = React.useState("Fetching Activities Failed")


  const handleThemeChange = (selectedTheme) => {
    dispatch(updateTheme(selectedTheme))
    setTheme(selectedTheme);
  };

  const updateUserPreferences = async () => {
    const preferenceData = {
      preferedActivities: userPreferences?.favouriteIds,
      voice: userPreferences?.assistant,
      theme: userPreferences?.theme
    }
    setLoading(true)
    try {
      const userPreferenceRequest = userPreferencesService.updateUserPreference(userPreferences?.id, preferenceData)
      const [userPreferenceResponse] = await Promise.all([userPreferenceRequest])
      dispatch(setPreferences(userPreferenceResponse.data))
      navigation.navigate(navigationconstants.PAGES.activities)
    } catch (error) {
      setErrorModalText("Failed to update user preferences, please retry")
      setErrorModalTitle("Failed to update preferences")
      setErrorModalVisible(true)
      log.error("Error in updating user preferences from preferences page", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOnDone = async () => {
    await updateUserPreferences();
  }

  return (
    <View style={{ flex: 1 }}>
      <ErrorModal
        errorDescription={errorModalText}
        errorTitle={errorModalTitle}
        setVisible={setErrorModalVisible}
        visible={errorModalVisible}
      />
      <ScrollView scrollEnabled={false}>
        <HStack justifyContent="flex-end" alignItems="center" mt={5} mx={2} flex={1}>

        </HStack>
        <Center>
          <VStack space={2} alignItems="center">

            <NrgHeader />
            <Text fontSize="3xl" color="black.800">Preferences</Text>
            <Text fontSize="sm" color="black.800" textAlign="center">Add preferences to get a personalized experience {'\n'} during your activity.</Text>
            <VStack space={5} alignItems="center">
              <Box w="72" mt={5}>
                <Text fontSize="xs" color="black.800" mb={1}>Voice Preference</Text>
                <Select
                  defaultValue={userPreferences.assistant}
                  selectedValue={userPreferences.assistant}
                  onValueChange={(value) => dispatch(setAssistantVoice(value))}
                  width="72"
                  isReadOnly
                  placeholder="Select Voice Preference"
                  _selectedItem={{
                    endIcon: <CheckIcon size="5" />,
                  }}
                  _placeholder={{
                    color: "gray.400",
                  }}

                >{assistantOptions.content.assistants.map(assistant => {
                  return <Select.Item
                    label={assistant?.name}
                    value={assistant?.id}
                    key={assistant?.id} />
                })}
                </Select>
              </Box>

              {/* <Box w="72">
                <Text fontSize="xs" color="black.800" mb={1}>Theme Preference</Text>
                <Select
                  selectedValue={userPreferences.theme}
                  onValueChange={handleThemeChange}
                  placeholder="Theme"
                  isReadOnly
                  _selectedItem={{
                    endIcon: <CheckIcon size="5" />
                  }}
                >
                  <Select.Item label="Default" value="default" />
                </Select>
              </Box> */}
              <Button
                mt={3}
                width="72"
                bgColor="black.800"
                _text={{ color: "base.500" }}
                isLoading={loading}
                onPress={() => handleOnDone()}>
                Done
              </Button>


              <HStack space={2}>
                <Progress
                  mt={5}
                  width="10"
                  value={100}
                  colorScheme="blue"
                  size="sm"
                />
                <Progress
                  mt={5}
                  width="10"
                  value={100}
                  colorScheme="blue"
                  size="sm"
                />
                <Progress
                  mt={5}
                  width="10"
                  value={100}
                  colorScheme="blue"
                  size="sm"
                />
              </HStack>
              <Text fontSize="xs" color="black.800" textAlign="center" mt="-2"> Final step </Text>

            </VStack>
          </VStack>
        </Center>
      </ScrollView>
    </View>
  );
};

export default Preferences;
