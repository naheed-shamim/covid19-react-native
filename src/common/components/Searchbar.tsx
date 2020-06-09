import React from 'react';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
  onChangeText: any;
  value?: string;
  placeHolder?: string;
}
export const SearchBar = (props: SearchBarProps) => {
  const { onChangeText, value, placeHolder = 'Search Here' } = props;
  return (
    <View style={{ borderRadius: 5, borderWidth: 1, padding: 1, margin: 10 }}>
      <TextInput
        style={{ backgroundColor: 'white', padding: 10, fontSize: 12 }}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeHolder}
        value={value}
        autoCorrect={false}
      />
    </View>
  );
};
