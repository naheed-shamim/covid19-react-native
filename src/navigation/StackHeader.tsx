import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants/Constants';
import { useTheme } from '@react-navigation/native';

export const StackHeader = ({ scene, previous, navigation }) => {
  const { colors } = useTheme();

  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: colors.card } }}>
      {menuIcon(previous, navigation)}
      <Appbar.Content title={title} titleStyle={{ color: colors.primary }} />
    </Appbar.Header>
  );
};

const menuIcon = (isPrevious, navigation) => {
  const { colors } = useTheme();
  const icon = isPrevious ? (
    <Image
      source={icons.back}
      style={{
        marginLeft: 10,
        height: 20,
        width: 20,
        tintColor: colors.primary,
      }}
    />
  ) : (
    <Image
      source={icons.menu}
      style={{ height: 40, width: 40, tintColor: 'transparent' }}
    />
  );

  const iconAction = () =>
    isPrevious ? navigation.pop() : navigation.openDrawer();
  return <TouchableOpacity onPress={iconAction}>{icon}</TouchableOpacity>;
};
