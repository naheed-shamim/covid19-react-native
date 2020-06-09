import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { toCommas } from '../../utils/CommonUtils';

export const CaseSummary = (props) => {
  const {
    active,
    confirmed,
    deltaConfirmed,
    recovered,
    deltaRecovered,
    deaths,
    deltaDeaths,
  } = props;

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.caseContainer}>
          <FontAwesome name='line-chart' size={24} color='#ff0089' />
          <Text style={styles.subStats}>{toCommas(deltaConfirmed)}</Text>
          <Text style={styles.stats}>{toCommas(confirmed)}</Text>
          <Text style={styles.label}>Confirmed</Text>
        </View>
        <View style={styles.caseContainer}>
          <FontAwesome5 name='heartbeat' size={24} color='blue' />
          <Text style={styles.subStats}>{''}</Text>
          <Text style={[styles.stats]}>{toCommas(active)}</Text>
          <Text style={styles.label}>Active</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.caseContainer}>
          <FontAwesome5 name='notes-medical' size={24} color='green' />
          <Text style={styles.subStats}>{toCommas(deltaRecovered)}</Text>
          <Text style={styles.stats}>{toCommas(recovered)}</Text>
          <Text style={styles.label}>Recovered</Text>
        </View>
        <View style={styles.caseContainer}>
          <Ionicons name='ios-rose' size={24} color='maroon' />
          <Text style={styles.subStats}>{toCommas(deltaDeaths)}</Text>
          <Text style={styles.stats}>{toCommas(deaths)}</Text>
          <Text style={styles.label}>Deaths</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  image: { width: 30, height: 30 },
  label: {},
  stats: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  subStats: { fontSize: 12, marginTop: 10 },
});
