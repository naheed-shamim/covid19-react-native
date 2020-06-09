import React, { useState } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { HorizontalRowItem } from './HorizontalRowItem';
import { strings } from '../../constants/Strings';
import { Colors } from '../VisualTheme';
interface CollapsibleRowItemProps {
  overallStateData: any;
  districtDetails: any;
}
export const CollapsibleRowItem = (props: CollapsibleRowItemProps) => {
  const [selected, setSelected] = useState(false);

  const { overallStateData, districtDetails = {} } = props;
  const districtData = !!districtDetails.districtData
    ? districtDetails.districtData
    : {};

  return (
    <View>
      <HorizontalRowItem
        overallData={overallStateData}
        selected={selected}
        onPress={() => setSelected(!selected)}
      />

      {selected && overallStateData.confirmed > 0 && (
        <Animated.View style={styles.districtContainer}>
          <Text style={[styles.districtText, { fontWeight: 'bold' }]}>
            {strings.district.toUpperCase()}
          </Text>
          <Text style={[styles.districtConfirmedTxt, { fontWeight: 'bold' }]}>
            {strings.confirmed.toUpperCase()}
          </Text>
        </Animated.View>
      )}
      {selected &&
        !!districtData &&
        Object.keys(districtData).map((item, i) => {
          const rowColor = i % 2 == 0 ? '#faf6d0' : '#a8c7bb';
          return (
            <View
              style={[styles.districtContainer, { backgroundColor: rowColor }]}
              key={i}
            >
              <Text style={styles.districtText}>{item}</Text>
              <Text
                style={[styles.districtConfirmedTxt, { paddingLeft: '10%' }]}
              >
                {districtData[item].confirmed}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  districtContainer: {
    flexDirection: 'row',
    padding: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#bfbfbf',
  },
  districtText: {
    fontSize: 14,
    marginLeft: '5%',
    flex: 1,
    color: Colors.black,
  },
  districtConfirmedTxt: {
    flex: 1,
    color: Colors.black,

    textAlign: 'left',
  },
});
