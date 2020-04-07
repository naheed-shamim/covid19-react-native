import React from 'react';
import { View, Text } from 'react-native';

export const SquareColoredRowItem = (props) => {
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
        height: 100,
        width: 100,
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Text>{label.toUpperCase()}</Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{value}</Text>
      </View>
    </View>
  );

  {
    /* // return (
    //     <View style= {{ flex: 1 }>
    //         <Text>{ 'this is Test'} < /Text>
    //         < /View>
    //     ) */
  }
};
