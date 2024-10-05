import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ActivitiesPage from '../screens/activities/activitiesPage';
import UpdatePreferences from '../screens/preferences/updatePreferences';
import LoginPage from '../screens/login/loginPage';
import PersonalDetails from '../screens/signup/personalDetails';
import ContactDetails from '../screens/signup/contactDetails';
import ActivityPage from '../screens/activities/activityPage';
import StartActivityPage from '../screens/activities/startActivityPage';
import navigationconstants from '../constants/navigationConstants';
import PauseActivityPage from '../screens/activities/pauseActivityPage';
import CreateAccount from '../screens/signup/createAccount';
import PreferredActivities from '../screens/signup/preferredActivities';
import UpdatePersonalDetails from '../screens/preferences/updatePersonalDetails';
import Preferences from '../screens/signup/preferences';

const Stack = createStackNavigator();


const ApplicationContent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={navigationconstants.PAGES.login} screenOptions={{...TransitionPresets.ModalFadeTransition}}>
        <Stack.Screen options={{ headerShown: false, headerTitle: "Activities" }} name={navigationconstants.PAGES.activities} component={ActivitiesPage} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Update Preferences" }} name={navigationconstants.PAGES.preferences} component={UpdatePreferences} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Login" }} name={navigationconstants.PAGES.login} component={LoginPage} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Personal Details" }} name={navigationconstants.PAGES.personalDetails} component={PersonalDetails} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Preferred Activities" }} name={navigationconstants.PAGES.interest} component={PreferredActivities} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Create Account" }} name={navigationconstants.PAGES.createAccount} component={CreateAccount} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Contact Details" }} name={navigationconstants.PAGES.contactDetails} component={ContactDetails} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Activity" }} name={navigationconstants.PAGES.activity} component={ActivityPage} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Start Activity" }} name={navigationconstants.PAGES.start} component={StartActivityPage} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Pause Activity" }} name={navigationconstants.PAGES.pause} component={PauseActivityPage} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Update Personal Data" }} name={navigationconstants.PAGES.updatePersonalDetails} component={UpdatePersonalDetails} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Set initial Preferences" }} name={navigationconstants.PAGES.setInitialPreferences} component={Preferences} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// ContactDetails not neing used
export default ApplicationContent;
