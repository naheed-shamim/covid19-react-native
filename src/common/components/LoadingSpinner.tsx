import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Theme } from '../VisualTheme';

interface Props {
  isVisible: boolean;
}
export default class LoadingSpinner extends Component<Props> {
  render() {
    if (this.props.isVisible) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color={Theme.PRIMARY_ACCENT} />
        </View>
      );
    } else return null;
  }
}

export const showLoader = (value: boolean) => {
  return <LoadingSpinner isVisible={value} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(242,242,242,0.4)',
  },
});
