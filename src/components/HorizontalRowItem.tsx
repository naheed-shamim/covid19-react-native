import React from 'react';
import { View, Text } from 'react-native';

export const HorizontalRowItem = (props) => {
  const { active, deaths, recovered, confirmed, state } = props;

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 2,
        borderWidth: 1,
        borderBottomWidth: 4,
        borderColor: 'black',
        margin: 5,
        padding: 5,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{state}</Text>
      <View style={{ flexDirection: 'row' }}>
        <HorizontalCovidRowData label={'confirmed'} value={confirmed} />
        <HorizontalCovidRowData label={'active'} value={active} />
        <HorizontalCovidRowData label={'deaths'} value={deaths} />
        <HorizontalCovidRowData label={'recovered'} value={recovered} />
      </View>
    </View>
  );
};

const HorizontalCovidRowData = (props) => {
  const { label, value } = props;
  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
      }}
    >
      <Text style={{ alignSelf: 'center' }}>{label.toUpperCase()}</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}}>{value}</Text>
    </View>
  );
};
