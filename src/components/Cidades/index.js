import React from 'react';

import { Container, TInput } from './styles';

export default ({ data, selectedValue, onValueChange }) => (
  <Container>
    {data ? (
      <TInput selectedValue={selectedValue} onValueChange={onValueChange}>
        <TInput.Item label="Selecione" />
        {data.cidades.map(cidade => (
          <TInput.Item key={cidade} label={cidade} value={cidade} />
        ))}
      </TInput>
    ) : (
      <TInput selectedValue={selectedValue} onValueChange={onValueChange}>
        <TInput.Item label="Selecione" />
      </TInput>
    )}
  </Container>
);
