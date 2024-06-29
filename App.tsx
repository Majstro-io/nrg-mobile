/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import ApplicationContent from './src/navigation/stackNavigation';
import darkTheme from './src/styles/theme';
import { enGB, registerTranslation } from 'react-native-paper-dates'

function App(): React.JSX.Element {
  registerTranslation('en', enGB)

  return (
    <PaperProvider theme={darkTheme}>
      <SafeAreaProvider>
        <ApplicationContent />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
