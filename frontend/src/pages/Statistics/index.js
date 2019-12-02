import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
// import { Container } from './styles';

export default function Statistics() {
  return (
    <View />
  );
}

Statistics.navigationOptions = {
  tabBarLabel: 'Estatísticas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tachometer" size={20} color={tintColor} />
  ),
};
