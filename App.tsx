import React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import VisualTheme, { Theme } from './src/common/VisualTheme';
import RootNavigator from './src/navigation/RootNavigator';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

export default function App() {
  const scheme = useColorScheme();
  console.log('Check Scheme');
  console.log(scheme);
  console.log(scheme === 'dark');

  const selectedTheme = scheme == 'dark' ? DarkTheme : DefaultTheme;
  console.log(selectedTheme);
  console.log(DarkTheme);

  return (
    <AppearanceProvider>
      <NavigationContainer theme={selectedTheme}>
        <RootNavigator />
      </NavigationContainer>
    </AppearanceProvider>
  );
}
