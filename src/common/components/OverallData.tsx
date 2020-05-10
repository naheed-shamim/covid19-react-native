import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { toCommas } from '../../utils/CommonUtils';

export const OverallData = (props) => {
  const { label, value, textColor } = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>{toCommas(value)}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontWeight: 'bold', fontSize: 26 },
  label: { fontSize: 15 },
});
