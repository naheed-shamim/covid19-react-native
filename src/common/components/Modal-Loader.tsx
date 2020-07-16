import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Loader = (props) => {
  const { colors } = useTheme();
  const { loading } = props;
  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View
        style={[styles.modalBackground, { backgroundColor: colors.background }]}
      >
        <View
          style={[
            styles.activityIndicatorWrapper,
            { backgroundColor: colors.card },
          ]}
        >
          <ActivityIndicator animating={loading} color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'grey',
    opacity: 0.9,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default Loader;
