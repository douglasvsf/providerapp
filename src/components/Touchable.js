import React from 'react';

import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const { OS } = Platform;

export const Touchable = ({ children, ...props }) => {
  const TouchableComponent =
    OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

  return <TouchableComponent {...props}>{children}</TouchableComponent>;
};
