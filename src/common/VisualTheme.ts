import { StyleSheet, Platform, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native';


export const Theme = {
  PRIMARY_ACCENT: 'blue',
}

export default StyleSheet.create(
  {
    droidSafeArea: {
      flex: 1,
    },

  })

export const Colors = {

  white: '#ffffff',
  black: '#000000',
  tableGrey: '#f2f2f2',
  lightRed: 'tomato',

  ACTIVE: 'blue',
  CONFIRMED: 'red',
  DECEASED: 'grey',
  RECOVERED: 'green',

  MAROON: 'rgb(200, 55, 108)'

}


