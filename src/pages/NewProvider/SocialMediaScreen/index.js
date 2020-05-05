import React, { useCallback } from 'react';
import SocialMedia from '~/pages/SocialMedia';

function SocialMediaScreen({ navigation }) {
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    socialMediaValues => {
      navigation.navigate('QualificationScreen');
    },
    [navigation]
  );

  return <SocialMedia isNewProvider onSubmitNewProvider={onSubmit} />;
}

export default SocialMediaScreen;
