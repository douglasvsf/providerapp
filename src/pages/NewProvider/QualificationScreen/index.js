import React, { useCallback } from 'react';
import Qualification from '~/pages/Qualification';

function QualificationScreen({ navigation }) {
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    qualificationValues => {
      navigation.navigate('Painel');
    },
    [navigation]
  );
  return <Qualification isNewProvider onSubmitNewProvider={onSubmit} />;
}

export default QualificationScreen;
