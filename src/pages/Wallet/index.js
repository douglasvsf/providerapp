import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  BackButton,
  Balance,
  Title,
  Value,
  QrCode,
  Options,
  Option,
  Message,
  Panel,
  Info,
  Money,
} from './styles';

import { colors } from '~/utils/colors';

export default function Wallet() {
  return (
    <Container>
      <Panel>
        <Balance>
          <Title>Seu saldo na carteira</Title>
          <Money>
            <Value>R$ 52,70</Value>
            <Icon name="keyboard-arrow-right" size={20} color="#F00" />
          </Money>
        </Balance>
        <QrCode>
          <Icon name="info" color="#999" size={28} />
          <Title>Detalhes</Title>
        </QrCode>
      </Panel>

      <Options horizontal>
        <Option onPress={() => {}}>
          <Icon name="credit-card" size={35} color="#999" />
          <Message>Formas de pagamento</Message>
        </Option>
        <Option onPress={() => {}}>
          <Icon name="help" size={35} color="#999" />
          <Message>Como Sacar</Message>
        </Option>
        <Option onPress={() => {}}>
          <Icon name="account-balance" size={35} color="#999" />
          <Message>Conta Bancaria</Message>
        </Option>
      </Options>

      <Panel>
        <Balance>
          <Money>
            <Title>Como funciona o saldo na minha carteira</Title>
            <MIcon name="cash-refund" size={40} color="#999" />
          </Money>

          <Info>
            O Saldo da sua carteira é o valor recebido via aplicativo, já
            descontado a taxa. Caso o pagamento for fora do app, será cobrado
            apenas a taxa do valor do serviço prestado. Para mais informações
            clique em 'Detalhes'.
          </Info>

          <Info>
            Você pode efetuar saque a qualquer momento para sua conta cadastrada
            no aplicativo, veja as taxas:
          </Info>
          <Info>*Banco Bradesco - Gratuito</Info>
          <Info>*Outros bancos - R$3,67</Info>
        </Balance>
      </Panel>
    </Container>
  );
}

Wallet.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Carteira',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-balance-wallet" size={20} color={tintColor} />
  ),
};
