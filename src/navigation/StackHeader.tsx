import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export const StackHeader = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: 'white' } }}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        {/* <Avatar.Image
          size={40}
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
        /> */}
        <MaterialCommunityIcons name='menu' size={40} />
      </TouchableOpacity>
      <Appbar.Content
        // title={previous ? title : <Ionicons name='md-home' size={40} />}
        title={scene.route.name}
      />
      {/* } /> */}
    </Appbar.Header>
  );
};

{
  /* <ion-icon name="menu-outline"></ion-icon> */
}
