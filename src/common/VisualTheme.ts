import { StyleSheet, Platform } from 'react-native'

export const Theme = {
  PRIMARY_ACCENT: 'blue',
}
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
})
