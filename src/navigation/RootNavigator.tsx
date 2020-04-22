import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../containers/HomeScreen';
import StateWiseList from '../containers/StateWiseList';
// import { Theme } from '../common/VisualTheme';
// import { icons } from '../constants/Constants';
import TimelineSeries from '../containers/TimelineSeries';
import { DrawerContent } from './DrawerContent';
import { StackHeader } from './StackHeader';

export const Screens = {
  HOME_STACK: 'HomeStack',
  TIMELINE_STACK: 'TimelineStack',
  HOME: 'Home',
  STATE_DATA: 'StateData',
  TIME_LINE_SERIES: 'TimelineSeries',
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
        // options={{ headerTitle: 'Twitter' }}
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

const TimeLineStackNavigator = () => {
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
        name={Screens.TIME_LINE_SERIES}
        component={TimelineSeries}
        options={{
          headerTitle: 'Covid India TimeLine',
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
      <Drawer.Screen name={Screens.HOME_STACK} component={HomeStackNavigator} />
      <Drawer.Screen
        name={Screens.TIMELINE_STACK}
        component={TimeLineStackNavigator}
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
