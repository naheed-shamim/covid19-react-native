import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { toCommas } from '../../utils/CommonUtils';

const expandIcon = require('../../../assets/expand-more.png');

interface Props {
  overallData: any;
  selected?: boolean;
  onPress?: event; //todo: check
}
export const HorizontalRowItem = React.memo((props: Props) => {
  // let spinValue = new Animated.Value(0); //TODO: Add Animation
  const { overallData, selected, onPress } = props;
  const {
    active,
    deaths,
    deltadeaths,
    recovered,
    deltarecovered,
    confirmed,
    deltaconfirmed,
    state,
    countryOrStateCode = null,
  } = overallData;

  // const spinValue = new Animated.Value(0);

  // // First set up animation
  // const animation = Animated.timing(spinValue, {
  //   toValue: 1,
  //   duration: 100,
  //   easing: Easing.linear,
  //   useNativeDriver: true, // To make use of native driver for performance
  // });

  // onPress && animation.start();

  // const outputAngleRange = selected ? ['0deg', '90deg'] : ['90deg', '0deg'];
  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: outputAngleRange,
  // });

  const getFlagImage = (countryCode: string) => {
    const flagSource = `https://www.countryflags.io/${countryCode}/flat/16.png`;
    return (
      <Image
        style={{ height: 25, width: 25, marginHorizontal: '1%' }}
        source={{ uri: flagSource }}
      />
    );
  };

  const animatedImage = () => {
    return (
      <Image
        source={expandIcon}
        // style={{ transform: [{ rotate: spin }] }}
      />
    );
  };
  const displayImage = countryOrStateCode
    ? getFlagImage(countryOrStateCode)
    : null;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.stateContainer}>
        {displayImage}
        <Text style={styles.stateNameTxt}>{state}</Text>
        <NewAndTotalCaseView
          totalCases={confirmed}
          newCases={deltaconfirmed}
          deltaColor={'red'}
        />
        <NewAndTotalCaseView
          totalCases={recovered}
          newCases={deltarecovered}
          deltaColor={'green'}
        />
        <NewAndTotalCaseView
          totalCases={deaths}
          newCases={deltadeaths}
          deltaColor={'grey'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
});

const NewAndTotalCaseView = (props) => {
  const { totalCases, newCases, deltaColor } = props;

  return (
    <View style={styles.stateNumberContainer}>
      <NewCasesView newCases={newCases} deltaColor={deltaColor} />

      <Text style={styles.stateNumbersTxt}>{toCommas(totalCases)}</Text>
    </View>
  );
};

const NewCasesView = (props) => {
  const { newCases, deltaColor } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AntDesign name='arrowup' size={10} color={deltaColor} />
      <Text style={[styles.stateDeltaNumbersTxt, { color: deltaColor }]}>
        {toCommas(newCases)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 3,
    margin: 3,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateNameTxt: { fontSize: 14, fontWeight: 'bold', flex: 2 },
  stateNumberContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stateDeltaNumbersTxt: {
    fontSize: 12,
  },
  stateNumbersTxt: {
    fontSize: 14,
    fontWeight: '600',
  },
});
