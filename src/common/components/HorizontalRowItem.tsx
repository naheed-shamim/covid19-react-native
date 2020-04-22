import React from 'react';
import { View, Text, Image, Animated, StyleSheet, Easing } from 'react-native';
import { toCommas } from '../../utils/CommonUtils';
const expandIcon = require('../../../assets/expand-more.png');

interface Props {
  overallData: any;
  selected: boolean;
}
export const HorizontalRowItem = (props: Props) => {
  // let spinValue = new Animated.Value(0); //TODO: Add Animation
  const { overallData, selected } = props;
  const { active, deaths, recovered, confirmed, state } = overallData;

  const rotationDegree = selected && confirmed > 0 ? '90deg' : '0deg';

  return (
    <View style={styles.stateContainer}>
      <Image
        source={expandIcon}
        style={{ transform: [{ rotate: rotationDegree }] }}
      />
      <Text style={styles.stateNameTxt}>{state}</Text>
      <Text style={styles.stateNumbersTxt}>{toCommas(active)}</Text>
      <Text style={styles.stateNumbersTxt}>{toCommas(deaths)}</Text>
      <Text style={styles.stateNumbersTxt}>{toCommas(recovered)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderColor: 'black',
    margin: 5,
    padding: 5,
    flexDirection: 'row',
  },
  stateNameTxt: { fontSize: 14, fontWeight: 'bold', flex: 2 },
  stateNumbersTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
  },
});
