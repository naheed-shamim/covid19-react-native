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
  const { title, onPress, bgColor = '#000', txtColor = 'black', selected } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: selected ? bgColor : '#eee', },
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 2
  },
});

export { BackgroundColoredButton };
