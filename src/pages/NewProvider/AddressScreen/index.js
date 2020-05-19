import React, { useCallback, useState } from 'react';

import axios from 'axios';

import Address from '../../Address';

// zipCode: Yup.string().required(),
//       publicPlace: Yup.string().required(),
//       number: Yup.string().required(),
//       neighborhood: Yup.string().required(),
//       city: Yup.string().required(),
//       state: Yup.string().required(),
//       complement: Yup.string(),

// cep: '',
// logradouro: '',
// complemento: '',
// bairro: '',
// localidade: '',
// uf: '',

function AddressScreen({ navigation }) {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    async address => {
      try {
        const { data } = await axios.post('', {
          zipCode: address.cep,
          publicPlace: address.logradouro,
          number: 123,
          neighborhood: address.bairro,
        });

        navigation.navigate('ActuationAreaScreen');
      } catch (ex) {
        console.warn(ex);
      } finally {
        setSubmitting(false);
      }
    },
    [navigation]
  );

  return (
    <Address
      isNewProvider
      onSubmitNewProvider={onSubmit}
      submitting={submitting}
    />
  );
}

export default AddressScreen;
