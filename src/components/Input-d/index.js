import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, TextInput } from './styles';
import { colors } from '../../utils/colors';

export default function Input({ placeholder, header }) {
  return (
    <Container header={header}>
      <Icon name="search" size={25} color="#FFFFFF" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#FFFFFF"
        fontStyle="bold"
      />
    </Container>
  );
}
