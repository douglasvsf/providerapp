import React, { useCallback } from 'react';
import Payment from '~/pages/Payment';

function PaymentMethodsScreen({ navigation }) {
  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    paymentMethods => {
      navigation.navigate('AditionalInfoScreen');
    },
    [navigation]
  );

  return <Payment isNewProvider onSubmitNewProvider={onSubmit} />;
}

export default PaymentMethodsScreen;
