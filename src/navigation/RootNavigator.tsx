import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/world/HomeScreen';
import CountriesList from '../containers/world/CountriesList';
import StateWiseList from '../containers/india/StateWiseList';
import TimelineSeries from '../containers/india/TimelineSeries';
import { DrawerContent } from './DrawerContent';
import { StackHeader } from './StackHeader';
import { Screens } from './Constants';
import IndiaScreen from '../containers/india/IndiaScreen';
import { Entypo } from '@expo/vector-icons';
import CountryDetailedData from '../containers/world/CountryDetailedData';
import { StateDetailedData } from '../containers/india/StateDetailedData';

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
    <Tab.Navigator
      // initialRouteName={'Home'}
      backBehavior='none'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, iconColor;

          iconColor = focused ? 'blue' : 'grey';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'World') {
            iconName = 'globe';
          }

          return <Entypo name={iconName} size={20} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name='World' component={WorldStackNavigator} />
      <Tab.Screen name='Home' component={IndiaStackNavigator} />
    </Tab.Navigator>
  );
};
/* Stack */
const WorldStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.HOME}
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
          title: 'COVID-19 Tracker',
        }}
      />
      <Stack.Screen
        name={Screens.COUNTRY_DATA}
        component={CountriesList}
        options={{
          title: 'Country Data',
        }}
      />
      <Stack.Screen
        name={Screens.COUNTRY_DETAILED_DATA}
        component={CountryDetailedData}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

const IndiaStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.INDIA}
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
          headerTitle: 'COVID-19 India Tracker',
        }}
      />
      <Stack.Screen
        name={Screens.STATE_DATA}
        component={StateWiseList}
        options={{
          title: 'States',
        }}
      />
      <Stack.Screen
        name={Screens.STATE_DETAILED_DATA}
        component={StateDetailedData}
        options={({ route }) => ({ title: route.params.name })}
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
