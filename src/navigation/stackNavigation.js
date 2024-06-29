import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppBar from '../components/appbar';
import Activities from '../screens/activities';
import Preferences from '../screens/preferences/preferences';
import LoginPage from '../screens/login/loginPage';
import PersonalDetails from '../screens/signup/personalDetails';
import ContactDetails from '../screens/signup/contactDetails';
import Activity from '../screens/activity';
import navigationconstants from '../constants/navigationConstants';
import darkTheme from '../styles/theme';

const Stack = createStackNavigator();


const ApplicationContent = () => {
  return (
    <NavigationContainer theme={darkTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}>
        <Stack.Screen options={{ headerTitle: "Activities" }} name={navigationconstants.PAGES.activities} component={Activities} />
        <Stack.Screen options={{ headerTitle: "Preferences" }} name={navigationconstants.PAGES.preferences} component={Preferences} />
        <Stack.Screen options={{ headerTitle: "Login" }} name={navigationconstants.PAGES.login} component={LoginPage} />
        <Stack.Screen options={{ headerTitle: "Personal Details" }} name={navigationconstants.PAGES.personalDetails} component={PersonalDetails} />
        <Stack.Screen options={{ headerTitle: "Contact Details" }} name={navigationconstants.PAGES.contactDetails} component={ContactDetails} />
        <Stack.Screen options={{ headerTitle: "Activity" }} name={navigationconstants.PAGES.activity} component={Activity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationContent;
