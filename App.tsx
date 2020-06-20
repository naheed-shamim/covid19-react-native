import React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Text, SafeAreaView } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ReduxStore } from './src/redux/ReduxStore';
import VisualTheme from './src/common/VisualTheme';

export default function App() {

  return (
    <Provider store={ReduxStore}>
      <RootNavigator />
    </Provider>
  );
}
