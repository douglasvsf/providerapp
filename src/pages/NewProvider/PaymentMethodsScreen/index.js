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
  const [creditBanner, setCreditBanner] = useState([]);
  const allowedCreditBanner = Array.from(creditBanner);
  const [debitBanner, setDebitbanner] = useState([]);
  const allowedDebitBanner = Array.from(debitBanner);

  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    async paymentMethod => {
      const machinecredit = !!(
        paymentMethod.visacredit === true ||
        paymentMethod.mastercredit === true ||
        paymentMethod.americancredit === true ||
        paymentMethod.hipercredit === true ||
        paymentMethod.elocredit === true
      );
      const machinedebit = !!(
        paymentMethod.visadebit === true ||
        paymentMethod.masterdebit === true ||
        paymentMethod.elodebit === true
      );

      // console.log(selectedCities.city);
      // console.log(selectedCities.uf.nome);

      allowedCreditBanner.push({
        visa: paymentMethod.visacredit,
        americanExpress: paymentMethod.americancredit,
        elo: paymentMethod.elocredit,
        mastercard: paymentMethod.mastercredit,
        hipercard: paymentMethod.hipercredit,
      });

      allowedDebitBanner.push({
        visa: paymentMethod.visadebit,
        mastercard: paymentMethod.masterdebit,
        elo: paymentMethod.elodebit,
      });

      const resultAllowedCreditBanner = allowedCreditBanner.find(obj => {
        return obj;
      });
      const resultAllowedDebitBanner = allowedDebitBanner.find(obj => {
        return obj;
      });
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await api.post(
          `providers/${profileId}/payment_methods`,
          {
            cash: paymentMethod.cashpayment,
            machineCredit: machinecredit,
            machineDebit: machinedebit,
            onlinePayment: paymentMethod.onlinepayment,
          }
        );

        // console.log(
        //   'oq envio',
        //   JSON.stringify({
        //     credit: resultAllowedCreditBanner,
        //     debit: resultAllowedDebitBanner,
        //   })
        // );

        const responseBanner = await api.post(
          `providers/${profileId}/allowed_card_banners`,
          {
            credit: resultAllowedCreditBanner,
            debit: resultAllowedDebitBanner,
          }
        );
        // console.log('respondenormal', response);
        // console.log('respondebanner', responseBanner);
        navigation.navigate('AditionalInfoScreen');
      } catch (ex) {
        return 0;
      } finally {
        setSubmitting(false);
      }
    },
    [allowedCreditBanner, allowedDebitBanner, navigation, profileId, token]
  );

  return (
    <Payment
      isNewProvider
      onSubmitNewProvider={onSubmit}
      token={token}
      profileid={profileId}
    />
  );
}

export default PaymentMethodsScreen;
