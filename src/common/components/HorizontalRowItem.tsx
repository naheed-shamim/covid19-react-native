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
import { Card, Divider } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { CountryFlag } from './Common';

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

  const flagImage = countryOrStateCode
    ? <CountryFlag countryCode={countryOrStateCode} />
    : null;

  const showSerialNum = () => {
    if (!!serialNum) {
      return (
        <Text
          style={[
            styles.stateNameTxt,
            { flex: 0, paddingHorizontal: '1%', color: colors.text, fontSize: 12 },
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
          {flagImage}
          <View style={{ flex: 1 }}>
            <Text style={[styles.stateNameTxt, { color: colors.text, alignSelf: 'center' }]}>
              {state}
            </Text>
            <View style={{ height: 1, backgroundColor: '#dcdcdc', margin: '2%' }} />
            <View style={{ flexDirection: 'row' }}>
              <ConsolidatedCaseView
                label={'Confimred'}
                totalCases={confirmed}
                newCases={deltaconfirmed}
                deltaColor={'red'}
                showNewCases={showDailyInfo}
              />
              <ConsolidatedCaseView
                label={'Recovered'}
                totalCases={recovered}
                newCases={deltarecovered}
                deltaColor={'green'}
                showNewCases={showDailyInfo}
              />
              <ConsolidatedCaseView
                label={'Deaths'}
                totalCases={deaths}
                newCases={deltadeaths}
                deltaColor={'grey'}
                showNewCases={showDailyInfo}
              />
            </View>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback >
  );
});

/******************** Consolidate Card View ********************/
interface ConsolidateCaseViewProps {
  label: string,
  totalCases: string, newCases: string, deltaColor: string, showNewCases: boolean
}

const ConsolidatedCaseView = React.memo((props: ConsolidateCaseViewProps) => {
  const { colors } = useTheme();

  const { label, totalCases, newCases, deltaColor, showNewCases } = props;

  return (
    <View style={styles.stateNumberContainer}>
      <Text numberOfLines={2} style={{ textAlign: 'center' }}>{label}</Text>
      {showNewCases && (
        <NewCasesView newCases={newCases} deltaColor={deltaColor} />
      )}

      <Text style={[styles.stateNumbersTxt, { color: colors.text }]}>
        {toCommas(totalCases)}
      </Text>
    </View>
  );
});


/******************** Consolidate New Cases View ********************/
interface NewCasesViewProps {
  newCases: string, deltaColor: string
}

const NewCasesView = React.memo((props: NewCasesViewProps) => {
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
    marginVertical: 3,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateNameTxt: { fontSize: 20, fontWeight: 'bold', flex: 1, paddingHorizontal: '5%' },
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



// ------ Remove COde ----
const animatedImage = () => {
  return (
    <Image
      source={expandIcon}
    // style={{ transform: [{ rotate: spin }] }}
    />
  );
};
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