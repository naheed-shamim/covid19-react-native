import { StyleSheet, Platform, StatusBar } from 'react-native'

export const Theme = {
  PRIMARY_ACCENT: 'blue',
}

const hasNotch = () => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight > 24;
  }
}

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' && hasNotch ? 25 : 0,
  },
})

export const Colors = {
  white: '#ffffff',
  black: '#000000',
  tableGrey: '#f2f2f2',
  lightRed: 'tomato'
}


