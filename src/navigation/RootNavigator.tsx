import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/HomeScreen';
import CountriesList from '../containers/CountriesList';
import StateWiseList from '../containers/StateWiseList';
import TimelineSeries from '../containers/TimelineSeries';
import { DrawerContent } from './DrawerContent';
import { StackHeader } from './StackHeader';
import { Screens } from './Constants';
import CustomTabBar from './components/CustomTabBar';
import IndiaScreen from '../containers/IndiaScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const iconMap = {
  home: '♡',
  search: '♢',
  favorites: '♧',
  profile: '♤',
};

const RootTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='World' backBehavior='none'>
      <Tab.Screen name='World' component={HomeStackNavigator} />
      <Tab.Screen name='Home' component={IndiaStackNavigator} />
    </Tab.Navigator>
  );
};
/* Stack */
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.HOME}
      headerMode='float'
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <StackHeader
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        ),
        // headerTintColor: 'white',
        // headerStyle: { backgroundColor: '#75a3a3' },
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name={Screens.HOME}
        component={HomeScreen}
        options={{
          headerTitle: 'COVID-19 Tracker',
        }}
      />
      <Stack.Screen
        name={Screens.STATE_DATA}
        component={StateWiseList}
        options={{
          title: 'State Data',
        }}
      />
      <Stack.Screen
        name={Screens.COUNTRY_DATA}
        component={CountriesList}
        options={{
          title: 'Country Data',
        }}
      />
    </Stack.Navigator>
  );
};

const IndiaStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.TIME_LINE_SERIES}
      headerMode='float'
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <StackHeader
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        ),
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name={Screens.INDIA}
        component={IndiaScreen}
        options={{
          headerTitle: 'Covid India TimeLine',
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

/* ==== DRAWER CONTETN ================================================================= */

const RootDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={Screens.HOME_STACK}
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: 240,
      }}
      screenOptions={{
        ...TransitionPresets.ScaleFromCenterAndroid,
        gestureEnabled: true,
      }}
      drawerContent={(navigation) => <DrawerContent {...navigation} />}
    >
      <Drawer.Screen name={Screens.HOME_STACK} component={RootTabNavigator} />
      <Drawer.Screen
        name={Screens.TIMELINE_STACK}
        component={IndiaStackNavigator}
      />
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
