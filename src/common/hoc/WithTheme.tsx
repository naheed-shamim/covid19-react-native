import React from 'react';
import { useTheme } from '@react-navigation/native';

export const WithTheme = (WrappedComponent) => {
  const themeWrapper = (props) => {
    const { colors } = useTheme();

    return <WrappedComponent {...props} themeColors={colors} />;
  };

  return themeWrapper;
};
