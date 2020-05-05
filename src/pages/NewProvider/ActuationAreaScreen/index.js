import React, { useCallback } from 'react';

import Service from '~/pages/Service';

function ActuationAreaScreen({ navigation }) {
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    ({ selectedCities, selectedAreaAtuacao }) => {
      navigation.navigate('PaymentMethodsScreen');
    },
    [navigation]
  );

  return <Service isNewProvider onSubmitNewProvider={onSubmit} />;
}

export default ActuationAreaScreen;
