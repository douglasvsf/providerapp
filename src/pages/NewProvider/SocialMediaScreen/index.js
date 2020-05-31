import React, { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import api from '../../../services/api';

import SocialMedia from '~/pages/SocialMedia';

function SocialMediaScreen({ navigation }) {
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile.id);
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    async socialMedias => {
      const result = socialMedias.find(obj => {
        return obj;
      });
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        console.log(
          'aaaaaaaaa',

          result
        );
        const response = await api.post(
          `users/${profileId}/social_media`,
          result
        );
        console.log(response);
        navigation.navigate('QualificationScreen');
      } catch (ex) {
        return 0;
      } finally {
        setSubmitting(false);
      }
    },
    [navigation, profileId, token]
  );

  return (
    <SocialMedia
      isNewProvider
      onSubmitNewProvider={onSubmit}
      navigation={navigation}
    />
  );
}

export default SocialMediaScreen;
