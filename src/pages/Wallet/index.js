import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
} from 'react-native-tab-view';
import BankAccount from '~/pages/BankAccount';
import Background from '~/components/Background';

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
  Separator,
} from './styles';

import { colors } from '~/utils/colors';

const initialLayout = { width: Dimensions.get('window').width };

export default function Wallet() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Carteira' },
    { key: 'second', title: 'Conta Bancaria' },
  ]);

  const FirstRoute = (props: SceneRendererProps) => (
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
        <Option onPress={() => props.jumpTo('second')}>
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

  const SecondRoute = () => <BankAccount />;
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#4ead93' }}
    />
  );

  return (
    <Background>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Background>
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
