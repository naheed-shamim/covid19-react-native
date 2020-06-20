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
import { Card } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

const expandIcon = require('../../../assets/expand-more.png');

interface Props {
  overallData: any;
  serialNum: number;
  selected?: boolean;
  showDailyInfo?: boolean;
  onPress?: any; //todo: check
}
export const HorizontalRowItem = React.memo((props: Props) => {
  // let spinValue = new Animated.Value(0); //TODO: Add Animation
  const {
    overallData,
    serialNum,
    showDailyInfo = false,
    selected,
    onPress,
  } = props;
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

  const { colors } = useTheme();

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

  const showSerialNum = () => {
    if (!!serialNum) {
      return (
        <Text
          style={[
            styles.stateNameTxt,
            { flex: 0, paddingHorizontal: '1%', color: colors.text },
          ]}
        >
          {serialNum}.
        </Text>
      );
    } else return null;
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Card elevation={3} style={{ margin: 5, backgroundColor: colors.card }}>
        <View style={styles.stateContainer}>
          {showSerialNum()}
          {displayImage}
          <Text style={[styles.stateNameTxt, { color: colors.text }]}>
            {state}
          </Text>
          <NewAndTotalCaseView
            totalCases={confirmed}
            newCases={deltaconfirmed}
            deltaColor={'red'}
            showNewCases={showDailyInfo}
          />
          <NewAndTotalCaseView
            totalCases={recovered}
            newCases={deltarecovered}
            deltaColor={'green'}
            showNewCases={showDailyInfo}
          />
          <NewAndTotalCaseView
            totalCases={deaths}
            newCases={deltadeaths}
            deltaColor={'grey'}
            showNewCases={showDailyInfo}
          />
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
});

const NewAndTotalCaseView = React.memo((props) => {
  const { colors } = useTheme();

  const { totalCases, newCases, deltaColor, showNewCases } = props;

  return (
    <View style={styles.stateNumberContainer}>
      {showNewCases && (
        <NewCasesView newCases={newCases} deltaColor={deltaColor} />
      )}

      <Text style={[styles.stateNumbersTxt, { color: colors.text }]}>
        {toCommas(totalCases)}
      </Text>
    </View>
  );
});

const NewCasesView = React.memo((props) => {
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
});

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'black',
    marginVertical: 3,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateNameTxt: { fontSize: 12, fontWeight: 'bold', flex: 2 },
  stateNumberContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stateDeltaNumbersTxt: {
    fontSize: 10,
  },
  stateNumbersTxt: {
    fontSize: 12,
    fontWeight: '600',
  },
});
