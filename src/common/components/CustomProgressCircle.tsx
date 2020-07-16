import React from 'react';
import ProgressCircle from 'react-native-progress-circle';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface Props {
  percent: number;
  descriptionLabel?: string;
  color: string;
}
export const CustomProgressCircle = (props: Props) => {
  const { colors } = useTheme();
  const { percent, descriptionLabel, color } = props;
  const percentage = percent.toFixed(2);
  return (
    <View
      style={{ flexDirection: 'column', alignItems: 'center', margin: '15%' }}
    >
      <ProgressCircle
        percent={parseInt(percentage)}
        radius={50}
        borderWidth={15}
        color={color}
        shadowColor='#899'
        bgColor={colors.card}
      >
        {percentage.length > 0 && (
          <Text
            style={{ fontSize: 16, fontWeight: '500', color: colors.text }}
          >{`${percentage}%`}</Text>
        )}
      </ProgressCircle>
      {descriptionLabel && (
        <Text style={{ fontSize: 14, fontWeight: 'bold', paddingTop: 10 }}>
          {descriptionLabel.toUpperCase()}
        </Text>
      )}
    </View>
  );
};
