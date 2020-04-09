import { StyleSheet, Platform, StatusBar } from 'react-native'

export const Theme = {
  PRIMARY_ACCENT: 'blue',
}
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' && hasNotch ? 25 : 0,
    // paddingBottom: 100
  },
})

const hasNotch = () => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight > 24;
  }
}
