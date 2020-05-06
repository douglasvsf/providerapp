import React from 'react';

import Mastercard from '../assets/brands/mastercard.svg';
import MastercardFalse from '../assets/brands/mastercard-false.svg';
import Visa from '../assets/brands/visa.svg';
import VisaFalse from '../assets/brands/visa-false.svg';
import Elo from '../assets/brands/elo.svg';
import EloFalse from '../assets/brands/elo-false.svg';
import Hipercard from '../assets/brands/hipercard.svg';
import HipercardFalse from '../assets/brands/hipercard-false.svg';
import Alipay from '../assets/brands/alipay.svg';
import AmericanExpress from '../assets/brands/american-express.svg';
import AmericanExpressFalse from '../assets/brands/american-express-false.svg';
import Code from '../assets/brands/code.svg';
import Diners from '../assets/brands/diners.svg';
import Generic from '../assets/brands/generic.svg';
import Discover from '../assets/brands/discover.svg';
import Hiper from '../assets/brands/hiper.svg';
import JCB from '../assets/brands/jcb.svg';
import Maestro from '../assets/brands/maestro.svg';
import Mir from '../assets/brands/mir.svg';
import PayPal from '../assets/brands/paypal.svg';
import UnionPay from '../assets/brands/unionpay.svg';
import OnlinePayment from '../assets/undraw_mobile_pay.svg';
import OnlinePaymentFalse from '../assets/undraw_mobile_pay_false.svg';
import CashPayment from '../assets/undraw_wallet.svg';
import CashPaymentFalse from '../assets/undraw_wallet_false.svg';

const BRANDS = {
  MASTERCARD_true: Mastercard,
  MASTERCARD_false: MastercardFalse,
  VISA_true: Visa,
  VISA_false: VisaFalse,
  ELO_true: Elo,
  ELO_false: EloFalse,
  HIPERCARD_true: Hipercard,
  HIPERCARD_false: HipercardFalse,
  AMERICAN_EXPRESS_true: AmericanExpress,
  AMERICAN_EXPRESS_false: AmericanExpressFalse,
  ALIPAY: Alipay,
  CODE: Code,
  DINERS: Diners,
  GENERIC: Generic,
  DISCOVER: Discover,
  HIPER: Hiper,
  JCB,
  MASTRO: Maestro,
  MIR: Mir,
  PAYPAL: PayPal,
  UNIONPAY: UnionPay,
  ONLINE_PAYMENT_true: OnlinePayment,
  ONLINE_PAYMENT_false: OnlinePaymentFalse,
  CASH_PAYMENT_true: CashPayment,
  CASH_PAYMENT_false: CashPaymentFalse,
};

const CardBrands = ({ brand, ...props }) => {
  const Comp = BRANDS[brand] || BRANDS.GENERIC;
  return <Comp {...props} />;
};

export default CardBrands;
