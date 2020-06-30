import numeral from 'numeral';

export const formatNumber = number => numeral(number).format('$,0.00');

export const centsToNumberString = number =>
  `R$ ${(number / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
