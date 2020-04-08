import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import StateWiseList from '../components/StateWiseList';

const Screens = {
  HOME: 'Home',
  STATE_DATA: 'StateData',
};

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.HOME}
        headerMode='screen'
        screenOptions={{
          headerTintColor: 'black',
          headerStyle: { backgroundColor: 'white' },
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