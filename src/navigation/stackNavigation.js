import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Activities from '../screens/activities/activities';
import Preferences from '../screens/preferences/preferences';
import LoginPage from '../screens/login/loginPage';
import PersonalDetails from '../screens/signup/personalDetails';
import ContactDetails from '../screens/signup/contactDetails';
import Activity from '../screens/activities/activity';
import navigationconstants from '../constants/navigationConstants';

const Stack = createStackNavigator();


const ApplicationContent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false, headerTitle: "Activities" }} name={navigationconstants.PAGES.activities} component={Activities} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Preferences" }} name={navigationconstants.PAGES.preferences} component={Preferences} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Login" }} name={navigationconstants.PAGES.login} component={LoginPage} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Personal Details" }} name={navigationconstants.PAGES.personalDetails} component={PersonalDetails} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Contact Details" }} name={navigationconstants.PAGES.contactDetails} component={ContactDetails} />
        <Stack.Screen options={{ headerShown: false, headerTitle: "Activity" }} name={navigationconstants.PAGES.activity} component={Activity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationContent;
