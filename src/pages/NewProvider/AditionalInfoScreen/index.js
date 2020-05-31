import React, { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import api from '../../../services/api';

import AdditionalInfo from '~/pages/AdditionalInfo';

function AditionalInfoScreen({ navigation }) {
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile.id);
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars

    async additionalInfo => {
      const result = additionalInfo.find(obj => {
        return obj;
      });
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        console.log(
          'aaaaaaaaa',

          result
        );
        const response = await api.post(
          `users/${profileId}/additional_info`,
          result
        );
        // console.log(response);
        navigation.navigate('SocialMediaScreen');
      } catch (ex) {
        console.warn(ex);
      } finally {
        setSubmitting(false);
      }
    },
    [navigation, profileId, token]
  );

  return (
    <AdditionalInfo
      isNewProvider
      onSubmitNewProvider={onSubmit}
      navigation={navigation}
    />
  );
}

export default AditionalInfoScreen;

// navigation.navigate('SocialMediaScreen');
