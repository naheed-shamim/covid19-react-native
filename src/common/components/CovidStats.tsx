import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  MemoizedLastUpdatedTime,
  MemoizedTotalAndNewCases,
} from './CommonElements';
import { Surface, Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { CustomProgressCircle } from './CustomProgressCircle';
import { getPercentage } from '../../utils/CommonUtils';
import { useTheme } from '@react-navigation/native';

export const CovidStats = (props) => {
  const {
    headerTitle = '',
    headerColor = '',
    totalConfirmed = '',
    newConfirmed = '',
    totalDeaths = '',
    newDeaths = '',
    totalRecovered = '',
    newRecovered = '',
    lastUpdatedTime = '',
    onPress,
  } = props;

  const getPercentageStats = () => {
    const deathPercentage = getPercentage(totalDeaths, totalConfirmed);
    const recoveryPercentage = getPercentage(totalRecovered, totalConfirmed);
    totalConfirmed;
    return {
      deathPercentage,
      recoveryPercentage,
    };
  };

  const showStats = () => {
    const { colors } = useTheme();

    const { deathPercentage, recoveryPercentage } = getPercentageStats();
    return (
      <View>
        <Surface style={styles.horizontalCardStyle}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 20,
              backgroundColor: colors.card,
            }}
          >
            <Text style={[styles.statsLabelStyle, { color: colors.text }]}>
              {'Total Confirmed'}
            </Text>
            <MemoizedTotalAndNewCases
              totalCases={totalConfirmed}
              newCases={newConfirmed}
              color='red'
            />
            <AntDesign name='right' size={10} color='black' />
          </TouchableOpacity>
        </Surface>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Surface
            style={[styles.squareCardStyle, { backgroundColor: colors.card }]}
          >
            <View style={styles.squareCardContainerStyle}>
              <Text style={[styles.statsLabelStyle, { color: colors.text }]}>
                {'Total Deaths'}
              </Text>
              <CustomProgressCircle percent={deathPercentage} color={'red'} />
              <MemoizedTotalAndNewCases
                totalCases={totalDeaths}
                newCases={newDeaths}
                color='grey'
              />
            </View>
          </Surface>
          <Surface
            style={[styles.squareCardStyle, { backgroundColor: colors.card }]}
          >
            <View style={[styles.squareCardContainerStyle]}>
              <Text style={[styles.statsLabelStyle, { color: colors.text }]}>
                {'Total Recovered'}
              </Text>
              <CustomProgressCircle
                percent={recoveryPercentage}
                color={'green'}
              />
              <MemoizedTotalAndNewCases
                totalCases={totalRecovered}
                newCases={newRecovered}
                color='green'
              />
            </View>
          </Surface>
        </View>
        <MemoizedLastUpdatedTime lastUpdatedTime={lastUpdatedTime} />
        <Divider style={{ margin: '5%' }} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.dummyHeader, { backgroundColor: headerColor }]}>
        <Text style={styles.titleText}>{headerTitle}</Text>
      </View>
      <View style={styles.statsContainer}>{showStats()}</View>
    </View>
  );
};

const blueHeaderHeight = 55;

const styles = StyleSheet.create({
  dummyHeader: {
    aspectRatio: 3,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  statsContainer: {
    height: `${blueHeaderHeight}%`,
    marginTop: '-15%',
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: '5%',
  },
  horizontalCardStyle: {
    margin: '5%',
    elevation: 5,
  },
  squareCardStyle: {
    flex: 1,
    margin: '2%',
    padding: '2%',
    justifyContent: 'center',
  },
  squareCardContainerStyle: { alignItems: 'center', padding: '10%' },
  statsValueStyle: { fontSize: 25, fontWeight: '600' },
  statsLabelStyle: { fontSize: 15 },
});
