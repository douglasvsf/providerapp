import React, { useCallback } from 'react';

import Address from '../../Address';

function AddressScreen({ navigation }) {
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    address => {
      navigation.navigate('ActuationAreaScreen');
    },
    [navigation]
  );

  return <Address isNewProvider onSubmitNewProvider={onSubmit} />;
}

export default AddressScreen;
