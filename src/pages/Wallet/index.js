import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import BankAccount from '~/pages/BankAccount';
import api from '~/services/api';
import { centsToNumberString } from '~/utils/formatNumber';
import {
  Balance,
  Container,
  Info,
  LoadingContainer,
  Message,
  Money,
  Option,
  Options,
  Panel,
  QrCode,
  Title,
  Value,
} from './styles';
import WalletDetailsScreen from './Details';

const initialLayout = { width: Dimensions.get('window').width };

export default function Wallet({ navigation }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Carteira' },
    { key: 'second', title: 'Conta Bancaria' },
  ]);
  const [walletHistory, setWalletHistory] = useState({});
  const [loadingWalletHistory, setloadingWalletHistory] = useState(false);

  async function loadWalletHistory() {
    setloadingWalletHistory(true);
    try {
      const { data: userWalletHistory } = await api.get('/user/wallet_history');

      setWalletHistory(userWalletHistory);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível trazer os dados da carteira');
    }

    setloadingWalletHistory(false);
  }

  function openWalletDetails() {
    navigation.navigate('WalletDetails', { walletHistory });
  }

  useEffect(() => {
    loadWalletHistory();
  }, []);

  const FirstRoute = props => (
    <Container>
      {loadingWalletHistory ? (
        <LoadingContainer>
          <ActivityIndicator color="black" animating size="large" />
          <Text>Carregando</Text>
        </LoadingContainer>
      ) : (
        <TouchableOpacity onPress={openWalletDetails}>
          <Panel>
            <Balance>
              <Title>Seu saldo na carteira</Title>
              <Money>
                <Value>{centsToNumberString(walletHistory.balance)}</Value>
                <Icon name="keyboard-arrow-right" size={20} color="#F00" />
              </Money>
            </Balance>
            <QrCode>
              <Icon name="info" color="#999" size={28} />
              <Title>Detalhes</Title>
            </QrCode>
          </Panel>
        </TouchableOpacity>
      )}

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
