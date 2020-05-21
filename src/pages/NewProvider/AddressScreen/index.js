import React, { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import api from '../../../services/api';

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
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile.id);

  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    async address => {
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await api.post(`users/${profileId}/address`, {
          zipCode: address.cep,
          publicPlace: address.logradouro,
          number: address.number,
          neighborhood: address.bairro,
          city: address.localidade,
          state: address.uf,
        });

        navigation.navigate('ActuationAreaScreen');
      } catch (ex) {
        console.warn(ex);
      } finally {
        setSubmitting(false);
      }
    },
    [navigation, profileId, token]
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
