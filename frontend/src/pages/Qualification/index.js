import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

// import { Container } from './styles';

export default function Qualification() {
  return (
    <View />
  );
}

Qualification.navigationOptions = {
  tabBarLabel: 'Qualificações',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
