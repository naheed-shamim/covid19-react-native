import React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import { View, Text } from 'react-native';

export const CustomProgressCircle = (props) => {
  const { percent, descriptionLabel, color } = props;
  const percentage = percent.toFixed(2);
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <ProgressCircle
        percent={parseInt(percentage)}
        radius={70}
        borderWidth={10}
        color={color}
        shadowColor='#999'
        bgColor='#fff'
      >
        {percentage > 0 && (
          <Text
            style={{ fontSize: 26, fontWeight: 'bold' }}
          >{`${percentage}%`}</Text>
        )}
      </ProgressCircle>
      <Text style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 10 }}>
        {descriptionLabel.toUpperCase()}
      </Text>
    </View>
  );
};
