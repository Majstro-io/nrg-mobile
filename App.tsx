/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import ApplicationContent from './src/navigation/stackNavigation';
import { enGB, registerTranslation } from 'react-native-paper-dates'
import { NativeBaseProvider, useColorMode } from 'native-base';
import { isDark } from 'native-base/lib/typescript/theme/tools';
import { ThemeProvider } from './src/styles/ThemeContext';

function App(): React.JSX.Element {
  registerTranslation('en', enGB)

  return (
    // <NativeBaseProvider theme={darkTheme} >
    //   <SafeAreaProvider>
    //     <ApplicationContent />
    //   </SafeAreaProvider>
    // </NativeBaseProvider>

    <ThemeProvider>
    <SafeAreaProvider>
      <ApplicationContent />
    </SafeAreaProvider>
  </ThemeProvider>
  );
}

export default App;
