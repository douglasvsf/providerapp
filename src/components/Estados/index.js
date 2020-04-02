import React, { Component } from 'react';
import { View, Picker } from 'react-native';

import { Container, TInput } from './styles';

export default props => (
  <Container>
    {props.data ? (
      <TInput
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
      >
        {props.data.map(estado => (
          <TInput.Item key={estado} label={estado.sigla} value={estado} />
        ))}
      </TInput>
    ) : null}
  </Container>
);
