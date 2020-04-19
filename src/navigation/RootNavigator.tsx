import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../containers/HomeScreen';
import StateWiseList from '../containers/StateWiseList';
import { Theme } from '../common/VisualTheme';
import { Image, Button } from 'react-native';
import { icons } from '../constants/Constants';
import TimelineSeries from '../containers/TimelineSeries';

const Screens = {
  HOME: 'Home',
  STATE_DATA: 'StateData',
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.HOME}
      headerMode='float'
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#75a3a3' },
        ...TransitionPresets.ScaleFromCenterAndroid,
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name={Screens.HOME}
        component={TimelineSeries}
        options={{
          title: 'COVID-19 Tracker',
        }}
      />
      <Stack.Screen
        name={Screens.STATE_DATA}
        component={StateWiseList}
        options={{
          title: 'State Data',
        }}
      />
    </Stack.Navigator>
  );
};

const RootDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={Screens.HOME}
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: 240,
      }}
    >
      <Drawer.Screen name={Screens.HOME} component={RootStackNavigator} />
      <Drawer.Screen name={Screens.STATE_DATA} component={StateWiseList} />
    </Drawer.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootDrawerNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
