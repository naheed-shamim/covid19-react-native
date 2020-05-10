import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface Props {
  title: string;
  onPress: any; //TODO: Correct this, add pat colors
  bgColor?: string;
  txtColor?: string;
  selected?: boolean;
}

const BackgroundColoredButton = (props: Props) => {
  const { title, onPress, bgColor, txtColor = 'red', selected } = props;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: selected ? bgColor : 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
      onPress={onPress}
    >
      <Text style={{ color: txtColor }}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export { BackgroundColoredButton };
