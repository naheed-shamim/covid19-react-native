import React from 'react';
import { View, Text } from 'react-native';

export const HorizontalRowItem = (props) => {
  const { label, value, color } = props;

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 2,
        borderWidth: 2,
        borderBottomWidth: 10,
        borderColor: color,
        margin: 10,
        padding: 10,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          flexDirection: 'column',
        }}
      >
        <Text>{label.toUpperCase()}</Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{value}</Text>
      </View>
    </View>
  );
};
