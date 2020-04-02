import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';

import { Container, TInput } from './styles';

export default props => (
  <Container>
    {props.data ? (
      <TInput
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
      >
        {props.data.cidades.map(cidade => (
          <TInput.Item key={cidade} label={cidade} value={cidade} />
        ))}
      </TInput>
    ) : (
      <TInput
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
      >
        <TInput.Item label={'Selecione'} />
      </TInput>
    )}
  </Container>
);
