import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Provider } from 'react-redux';
import VisualTheme, { Theme } from './src/common/VisualTheme';
import RootNavigator from './src/navigation/RootNavigator';
import { ReduxStore } from './src/redux/ReduxStore';

export default function App() {
  return (
    <Provider store={ReduxStore}>
      <SafeAreaView style={VisualTheme.droidSafeArea}>
        <RootNavigator />
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
