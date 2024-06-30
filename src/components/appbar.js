import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

const AppBar = ({ navigation, back, options }) => {
  const theme = useTheme();

  return (
    // <Appbar.Header style={{ backgroundColor:theme.colors.appbarColor}}>
    //   {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    //   <Appbar.Content title={options?.headerTitle} />
    //   <Appbar.Action icon="information-outline" onPress={() => { navigation.navigate('Profile') }} />
    // </Appbar.Header>
  )
};

export default AppBar;
