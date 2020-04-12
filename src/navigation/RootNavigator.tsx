import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../components/HomeScreen';
import StateWiseList from '../components/StateWiseList';
import { Theme } from '../common/VisualTheme';

const Screens = {
  HOME: 'Home',
  STATE_DATA: 'StateData',
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.HOME}
      headerMode='float'
      // mode='modal'
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
        component={HomeScreen}
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

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={Screens.HOME}>
      <Drawer.Screen name={Screens.HOME} component={HomeScreen} />
      <Drawer.Screen name={Screens.STATE_DATA} component={StateWiseList} />
    </Drawer.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      
        <StackNavigator />
      {/* </DrawerNavigator> */}

      {/* </DrawerNavigator> */}
      {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
};

export default RootNavigator;
// function MyStack() {
//     return (
//         <Stack.Navigator
//       initialRouteName= "Home"
//     headerMode = "screen"
//     screenOptions = {{
//         headerTintColor: 'white',
//             headerStyle: { backgroundColor: 'tomato' },
//     }
// }
//     >
//     <Stack.Screen
//         name="Home"
// component = { Home }
// options = {{
//     title: 'Awesome app',
//         }}
// />
//     < Stack.Screen
// name = "Profile"
// component = { Profile }
// options = {{
//     title: 'My profile',
//         }}
// />
//     < Stack.Screen
// name = "Settings"
// component = { Settings }
// options = {{
//     gestureEnabled: false,
//         }}
// />
//     < /Stack.Navigator>
//   );
// }
