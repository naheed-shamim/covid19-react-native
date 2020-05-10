import React from 'react';

import TimeAgo from 'react-native-timeago';
import { View, Text, StyleSheet } from 'react-native';
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
