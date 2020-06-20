import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

interface SearchBarProps {
  onChangeText: any;
  value?: string;
  placeHolder?: string;
}
export const SearchBar = (props: SearchBarProps) => {
  const { colors } = useTheme();
  const { onChangeText, value, placeHolder = 'Search Here' } = props;
  return (
    <View
      style={{
        borderRadius: 5,
        borderWidth: 1,
        padding: 1,
        margin: 10,
        backgroundColor: colors.card,
        borderColor: colors.text,
      }}
    >
      <TextInput
        style={{
          // backgroundColor: 'white',
          padding: 10,
          fontSize: 12,
          color: colors.text,
        }}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeHolder}
        value={value}
        autoCorrect={false}
      />
    </View>
  );
};
