import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useColorScheme, AppearanceProvider } from 'react-native-appearance';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/world/HomeScreen';
import CountriesList from '../containers/world/CountriesList';
import StateWiseList from '../containers/india/StateWiseList';

import { DrawerContent } from './DrawerContent';
import { StackHeader } from './StackHeader';
import { Screens } from './Constants';
import IndiaScreen from '../containers/india/IndiaScreen';
import { Entypo } from '@expo/vector-icons';
import CountryDetailedData from '../containers/world/CountryDetailedData';
import StateDetailedData from '../containers/india/StateDetailedData';
import VisualTheme from '../common/VisualTheme';

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
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      backBehavior='none'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, iconColor;

          iconColor = focused ? colors.primary : 'grey';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'World') {
            iconName = 'globe';
          }

          return <Entypo name={iconName} size={20} color={iconColor} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: 'gray',
        style: { backgroundColor: colors.card },
      }}
    >
      <Tab.Screen name='World' component={WorldStackNavigator} />
      <Tab.Screen name='Home' component={IndiaStackNavigator} />
    </Tab.Navigator>
  );
};
/* Stack */
const WorldStackNavigator = () => {
  const { colors } = useTheme();
  const themeColor = { themeColors: colors };
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
        initialParams={themeColor}
      />
      <Stack.Screen
        name={Screens.COUNTRY_DATA}
        component={CountriesList}
        options={{
          title: 'Country Data',
        }}
        initialParams={themeColor}
      />
      <Stack.Screen
        name={Screens.COUNTRY_DETAILED_DATA}
        component={CountryDetailedData}
        options={({ route }) => ({ title: route.params.name })}
        initialParams={themeColor}
      />
    </Stack.Navigator>
  );
};

const IndiaStackNavigator = () => {
  const { colors } = useTheme();
  const themeColor = { themeColors: colors };
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
        initialParams={themeColor}
      />
      <Stack.Screen
        name={Screens.STATE_DATA}
        component={StateWiseList}
        options={{
          title: 'States',
        }}
        initialParams={themeColor}
      />
      <Stack.Screen
        name={Screens.STATE_DETAILED_DATA}
        component={StateDetailedData}
        options={({ route }) => ({ title: route.params.name })}
        initialParams={themeColor}
      />
    </Stack.Navigator>
  );
};

/* ==== DRAWER CONTENT ================================================================= */

const RootDrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName={Screens.HOME_STACK}
      drawerStyle={{
        backgroundColor: 'white',
        width: 240,
      }}
      screenOptions={{
        ...TransitionPresets.ScaleFromCenterAndroid,
        gestureEnabled: true,
      }}
      drawerContent={(navigation) => (
        <DrawerContent {...navigation} onThemeToggle={props.toggleTheme} />
      )}
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
  const scheme = useColorScheme();

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  function toggleTheme() {
    // We will pass this function to Drawer and invoke it on theme switch press
    setIsDarkTheme((isDark) => !isDark);
  }

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      text: '#fff',
    },
  };

  // const selectedTheme = isDarkTheme ? CustomDarkTheme : DefaultTheme;
  const selectedTheme = scheme == 'dark' ? CustomDarkTheme : DefaultTheme;
  const safeAreaStyle = [
    VisualTheme.droidSafeArea,
    { backgroundColor: selectedTheme.colors.background },
  ];

  return (
    <AppearanceProvider>
      <SafeAreaView style={safeAreaStyle}>
        <NavigationContainer theme={selectedTheme}>
          <RootDrawerNavigator toggleTheme={toggleTheme} />
        </NavigationContainer>
      </SafeAreaView>
    </AppearanceProvider>
  );
};

export default RootNavigator;
