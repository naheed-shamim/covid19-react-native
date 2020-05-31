import React from 'react';

import TimeAgo from 'react-native-timeago';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { toCommas } from '../../utils/CommonUtils';

const LastUpdatedTime = (props) => {
  const { lastUpdatedTime } = props;

  return (
    <View
      style={{
        alignSelf: 'center',
        padding: '2%',
        alignItems: 'center',
      }}
    >
      <Text>{'Last Updated: '}</Text>
      <TimeAgo time={lastUpdatedTime} />
    </View>
  );
};
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
  return (
    <View style={flatListHeaderStyles.container}>
      <TouchableOpacity
        style={flatListHeaderStyles.title}
        onPress={() => onPress('title')}
      >
        <Text style={flatListHeaderStyles.text}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={flatListHeaderStyles.options}
        onPress={() => onPress('confirmed')}
      >
        <Text style={flatListHeaderStyles.text}>{'Confirmed'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={flatListHeaderStyles.options}
        onPress={() => onPress('recovered')}
      >
        <Text style={flatListHeaderStyles.text}>{'Recovered'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={flatListHeaderStyles.options}
        onPress={() => onPress('deaths')}
      >
        <Text style={flatListHeaderStyles.text}>{'Deaths'}</Text>
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
    marginTop: '3%',
    margin: '1%',
    paddingLeft: 20,
    padding: 3,
    
  },
  title: { flex: 2 },
  options: {
    alignItems: 'center',
    flex: 1,
  },
  text: { fontSize: 12 },
});
