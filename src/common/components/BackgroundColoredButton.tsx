import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  bgColor?: string;
  txtColor?: string;
  selected?: boolean;
}

const BackgroundColoredButton: React.FunctionComponent<ButtonProps> = (
  props
) => {
  const { title, onPress, bgColor, txtColor = 'red', selected } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: selected ? bgColor : 'yellow' },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: txtColor }}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export { BackgroundColoredButton };
