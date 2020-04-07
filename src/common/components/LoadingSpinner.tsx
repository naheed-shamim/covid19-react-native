import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class LoadingSpinner extends Component {
  render() {
    if (this.props.isVisible) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      );
    } else return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(242,242,242,0.4)',
  },
  // horizontal: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   padding: 10,
  // },
});
