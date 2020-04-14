import React from 'react';

import { FormInput } from './styles';

const Details = ({ endereco }) => (
  <>
    <FormInput
      value={endereco.logradouro}
      name="logradouro"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Logradouro"
    />

    <FormInput
      name="numero"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Numero"
    />

    <FormInput
      value={endereco.bairro}
      name="bairro"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Bairro"
    />

    <FormInput
      name="complemento"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Complemento"
    />

    <FormInput
      value={endereco.localidade}
      name="localidade"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Localidade"
    />

    <FormInput
      value={endereco.uf}
      name="uf"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Estado"
    />
  </>
);

export default Details;
