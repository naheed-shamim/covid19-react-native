import React from 'react';

import TimeAgo from 'react-native-timeago';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { toCommas } from '../../utils/CommonUtils';
import { icons } from '../../constants/Constants';
import Loader from './Modal-Loader';
import { useTheme } from '@react-navigation/native';

export const showLoader = (visible: boolean) => {
  return <Loader visible={visible} />;
};

export const ErrorLabel = (props) => {
  const { message, onPress, btnLabel = 'Try Again' } = props;
  return (
    <View style={{ alignItems: 'center' }}>
      <Text>{message}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: 'blue' }}>{btnLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const LastUpdatedTime = React.memo((props) => {
  const { lastUpdatedTime } = props;
  const { colors } = useTheme();

  return (
    <View
      style={{
        alignSelf: 'center',
        padding: '2%',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: colors.text }}>{'Last Updated: '}</Text>
      <TimeAgo time={lastUpdatedTime} style={{ color: colors.text }} />
    </View>
  );
});
export const MemoizedLastUpdatedTime = React.memo(LastUpdatedTime);

const TotalAndNewCase = (props) => {
  const { totalCases, newCases, color } = props;
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <AntDesign name='arrowup' size={14} color={color} />
        <Text style={{ color: color }}>{toCommas(newCases)}</Text>
      </View>
      <Text style={[styles.statsValueStyle, { color: color }]}>
        {toCommas(totalCases)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statsValueStyle: { fontSize: 25, fontWeight: '600' },
});
export const MemoizedTotalAndNewCases = React.memo(TotalAndNewCase);

export const FlatListHeader = (props) => {
  const { title, onPress } = props;
  const { colors } = useTheme();
  return (
    <View style={flatListHeaderStyles.container}>
      <TouchableOpacity
        style={flatListHeaderStyles.title}
        onPress={() => onPress('title')}
      >
        <Image source={icons.sort} style={{ height: 12, width: 12 }} />
        <Text style={[flatListHeaderStyles.text, { color: colors.text }]}>
          {title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={flatListHeaderStyles.options}
        onPress={() => onPress('confirmed')}
      >
        <Image
          source={icons.sort}
          style={{ height: 12, width: 12 }}
          tintColor={colors.text}
        />
        <Text style={[flatListHeaderStyles.text, , { color: colors.text }]}>
          {'CNFMD'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={flatListHeaderStyles.options}
        onPress={() => onPress('recovered')}
      >
        <Image source={icons.sort} style={{ height: 12, width: 12 }} />
        <Text style={[flatListHeaderStyles.text, , { color: colors.text }]}>
          {'RCVD'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={flatListHeaderStyles.options}
        onPress={() => onPress('deaths')}
      >
        <Image source={icons.sort} style={{ height: 12, width: 12 }} />
        <Text style={[flatListHeaderStyles.text, , { color: colors.text }]}>
          {'DEATHS'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const ShowEmptyWithRefresh = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>No Data Found, Please Refresh</Text>
    </View>
  );
};
const flatListHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: '1%',
    paddingLeft: 10,
    padding: 3,
  },
  title: {
    flexDirection: 'row',
    flex: 2,
    // borderWidth: 0.5,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: 'black',
  },
  options: {
    // borderWidth: 0.5,
    borderBottomWidth: 1,
    // borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: { fontSize: 12 },
});
