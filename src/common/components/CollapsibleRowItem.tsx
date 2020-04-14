import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
      <TouchableOpacity onPress={() => setSelected(!selected)}>
        <HorizontalRowItem overallData={overallStateData} selected={selected} />
      </TouchableOpacity>

      {selected && overallStateData.confirmed > 0 && (
        <View style={styles.districtContainer}>
          <Text style={[styles.districtText, { fontWeight: 'bold' }]}>
            {strings.district.toUpperCase()}
          </Text>
          <Text style={[styles.districtConfirmedTxt, { fontWeight: 'bold' }]}>
            {strings.confirmed.toUpperCase()}
          </Text>
        </View>
      )}
      {selected &&
        !!districtData &&
        Object.keys(districtData).map((item, i) => {
          const rowColor = i % 2 == 0 ? Colors.white : '#f2f2f2';
          return (
            <View
              style={[styles.districtContainer, { backgroundColor: rowColor }]}
              key={i}
            >
              <Text style={styles.districtText}>{item}</Text>
              <Text style={styles.districtConfirmedTxt}>
                {districtData[item].confirmed}
              </Text>
            </View>
          );
        })}
      {selected && !!districtData && overallStateData.confirmed > 0 && (
        <View
          style={[
            styles.districtContainer,
            { backgroundColor: Colors.lightRed },
          ]}
        >
          <Text style={[styles.districtText, { fontWeight: 'bold' }]}>
            {strings.totalConfirmed}
          </Text>
          <Text style={[styles.districtConfirmedTxt, { fontWeight: 'bold' }]}>
            {overallStateData.confirmed}
          </Text>
        </View>
      )}
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
    flex: 2,
    color: Colors.black,
  },
  districtConfirmedTxt: {
    flex: 1,
    color: Colors.black,
    textAlign: 'center',
  },
});
