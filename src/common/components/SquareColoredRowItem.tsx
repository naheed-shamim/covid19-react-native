import React from 'react';
import { View, Text } from 'react-native';
import AnimatedTextCounter from './AnimatedTextCounter';
import { toCommas } from '../../utils/CommonUtils';
import { Card } from 'react-native-paper';

export const SquareColoredRowItem = (props) => {
  const {
    title = '',
    value = '',
    secondaryValue,
    textColor = 'black',
    bgColor,
  } = props;

  return (
    <Card
      elevation={3}
      style={{ margin: 10, padding: 10, height: 150, width: 150 }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 20,
          backgroundColor: 'white',

          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <Text>{title.toUpperCase()}</Text>
          {/* <AnimatedTextCounter fromValue={0} toValue={value} /> */}
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {toCommas(value)}
          </Text>
        </View>
      </View>
    </Card>
  );
};
