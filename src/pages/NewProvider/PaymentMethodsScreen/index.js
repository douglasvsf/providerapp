import React, { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import api from '../../../services/api';

import Payment from '~/pages/Payment';

// {
// 	"cash": true,
// 	"machineCredit": true,
// 	"machineDebit": true,
// 	"onlinePayment": true
// }

// onlinepayment: false,
// cashpayment: false,
// visacredit: false,
// visadebit: false,
// mastercredit: false,
// masterdebit: false,
// americancredit: false,
// elocredit: false,
// elodebit: false,
// hipercredit: false,
function PaymentMethodsScreen({ navigation }) {
   const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile.id);

  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    async paymentMethod => {
      const machinecredit =  paymentMethod.visacredit === true ||paymentMethod.mastercredit === true ||paymentMethod.americancredit === true ||paymentMethod.visacredit === true  ? true : false;
      const machinedebit =  paymentMethod.visadebit === true || paymentMethod.masterdebit === true || paymentMethod.elodebit === true ? true : false;

      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await api.post(`providers/${profileId}/payment_methods`, {
          cash: paymentMethod.cashpayment,
          machineCredit: machinecredit,
          machineDebit: machinedebit,
          onlinePayment: paymentMethod.onlinepayment,
        });
        console.log(response);
        navigation.navigate('AditionalInfoScreen');
      } catch (ex) {
        console.warn(ex);
      } finally {
        setSubmitting(false);
      }
    },
    [navigation, profileId, token]
  );

  return <Payment isNewProvider onSubmitNewProvider={onSubmit} />;
}

export default PaymentMethodsScreen;
