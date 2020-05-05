import React, { useCallback } from 'react';

import AdditionalInfo from '~/pages/AdditionalInfo';

function AditionalInfoScreen({ navigation }) {
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    aditionalInfo => {
      navigation.navigate('SocialMediaScreen');
    },
    [navigation]
  );

  return <AdditionalInfo isNewProvider onSubmitNewProvider={onSubmit} />;
}

export default AditionalInfoScreen;
