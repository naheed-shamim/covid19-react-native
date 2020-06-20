import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { toCommas } from '../../utils/CommonUtils';
import { useTheme } from '@react-navigation/native';

export const CaseSummary = (props) => {
  const { colors } = useTheme();
  const {
    active,
    confirmed,
    deltaConfirmed,
    recovered,
    deltaRecovered,
    deaths,
    deltaDeaths,
  } = props;

  const cardContainerStyle = [
    styles.caseContainer,
    { backgroundColor: colors.card },
  ];

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={cardContainerStyle}>
          <FontAwesome name='line-chart' size={24} color='#ff0089' />
          <Text style={[styles.subStats, { color: colors.text }]}>
            {toCommas(deltaConfirmed)}
          </Text>
          <Text style={[styles.stats, { color: colors.text }]}>
            {toCommas(confirmed)}
          </Text>
          <Text style={[styles.label, { color: colors.text }]}>Confirmed</Text>
        </View>
        <View style={cardContainerStyle}>
          <FontAwesome5 name='heartbeat' size={24} color='blue' />
          <Text style={[styles.subStats, { color: colors.text }]}>{''}</Text>
          <Text style={[styles.stats, { color: colors.text }]}>
            {toCommas(active)}
          </Text>
          <Text style={[styles.label, { color: colors.text }]}>Active</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={cardContainerStyle}>
          <FontAwesome5 name='notes-medical' size={24} color='green' />
          <Text style={(styles.subStats, { color: colors.text })}>
            {toCommas(deltaRecovered)}
          </Text>
          <Text style={[styles.stats, , { color: colors.text }]}>
            {toCommas(recovered)}
          </Text>
          <Text style={[styles.label, , { color: colors.text }]}>
            Recovered
          </Text>
        </View>
        <View style={cardContainerStyle}>
          <Ionicons name='ios-rose' size={24} color='maroon' />
          <Text style={[styles.subStats, { color: colors.text }]}>
            {toCommas(deltaDeaths)}
          </Text>
          <Text style={[styles.stats, { color: colors.text }]}>
            {toCommas(deaths)}
          </Text>
          <Text style={[styles.label, { color: colors.text }]}>Deaths</Text>
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
