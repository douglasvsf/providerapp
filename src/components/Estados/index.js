import React from 'react';

import { Container, TInput } from './styles';

export default ({ data, selectedValue, onValueChange }) => (
  <Container>
    {data ? (
      <TInput selectedValue={selectedValue} onValueChange={onValueChange}>
        <TInput.Item label="Selecione" />
        {data.map(estado => (
          <TInput.Item key={estado} label={estado.sigla} value={estado} />
        ))}
      </TInput>
    ) : null}
  </Container>
);
