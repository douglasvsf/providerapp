import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Qualification from '~/pages/Qualification';
import api from '../../../services/api';
import { ActiveRequest } from '~/store/modules/auth/actions';

function QualificationScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile.id);
  const email = useSelector(state => state.user.profile.email);
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars

    async Arrayqualifications => {
      console.log(
        'oq envio',
        JSON.stringify({
          qualifications: Arrayqualifications,
        })
      );
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await api.post(
          `providers/${profileId}/qualifications`,
          {
            qualifications: Arrayqualifications,
          }
        );
        console.log(response);
      } catch (ex) {
        return 0;
      }
      dispatch(ActiveRequest(email, profileId));
      navigation.navigate('Painel');
    },

    [dispatch, email, navigation, profileId, token]
  );
  return (
    <Qualification
      isNewProvider
      onSubmitNewProvider={onSubmit}
      navigation={navigation}
    />
  );
}

export default QualificationScreen;
