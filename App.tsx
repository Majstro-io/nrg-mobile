/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import ApplicationContent from './src/navigation/stackNavigation';
import { enGB, registerTranslation } from 'react-native-paper-dates'
import { ThemeProvider } from './src/styles/ThemeContext';
import { Provider } from 'react-redux';

import store from "./src/store/store"

function App(): React.JSX.Element {
  registerTranslation('en', enGB)

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <ApplicationContent />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
