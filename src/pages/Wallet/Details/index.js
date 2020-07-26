import { format } from 'date-fns';
import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { centsToNumberString } from '~/utils/formatNumber';
import {
  Container,
  Title,
  WalletItem,
  WalletItemBody,
  WalletItemDateText,
  WalletItemFooter,
  WalletItemHeader,
  WalletItemPaymentMethodContainer,
  WalletItemPaymentMethodText,
  WalletItemSolicitationText,
  WalletItemTaxValueText,
  WalletItemValueText,
  WalletList,
} from './styles';
import SolicitationDetailsModal from '~/pages/Chat/SolicitationDetailsModal';
import api from '~/services/api';

const PaymentMethod = {
  ONLINE: 'online_payment',
  MONEY: 'cash',
  CREDIT_CARD: 'machine_credit',
  DEBIT_CARD: 'machine_debit',
};

export default function WalletDetailsScreen({ navigation }) {
  const walletHistory = navigation.getParam('walletHistory');

  const [
    showSolicitationDetailsModal,
    setShowSolicitationDetailsModal,
  ] = useState(false);

  const [selectedSolicitation, setSolicitation] = useState(null);
  const [isLoadingSolicitation, setIsLoadingSolicitation] = useState(false);

  function getPaymentMethodContainerBackgroundColor(paymentMethod) {
    switch (paymentMethod) {
      case PaymentMethod.ONLINE:
        return '#80deea';
      case PaymentMethod.MONEY:
        return '#26c6da';
      case PaymentMethod.CREDIT_CARD:
        return '#26a69a';
      case PaymentMethod.DEBIT_CARD:
        return '#80cbc4';
      default:
        return 'red';
    }
  }

  function paymentMethodToString(paymentMethod) {
    switch (paymentMethod) {
      case PaymentMethod.ONLINE:
        return 'Pago online';
      case PaymentMethod.MONEY:
        return 'Pago em dinheiro';
      case PaymentMethod.CREDIT_CARD:
        return 'Pago com cartão de crédito';
      case PaymentMethod.DEBIT_CARD:
        return 'Pago com cartão de débito';
      default:
        return 'Tipo de pagamento inválido';
    }
  }

  async function requestSolicitationDetails(solicitationId) {
    try {
      const { data: solicitationDetails } = await api.get(
        `/solicitation/${solicitationId}`
      );
      return solicitationDetails;
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível consultar os detalhes da solicitação'
      );
      return null;
    }
  }

  async function openSolicitationDetailsModal(solicitation) {
    setShowSolicitationDetailsModal(true);
    setIsLoadingSolicitation(true);

    const solicitationDetails = await requestSolicitationDetails(
      solicitation.id
    );

    setIsLoadingSolicitation(false);
    setSolicitation(solicitationDetails);
  }

  function hideSolicitationDetailsModal() {
    setSolicitation(null);
    setShowSolicitationDetailsModal(false);
  }

  function renderSolicitationDetailsModal() {
    return (
      <SolicitationDetailsModal
        isVisible={showSolicitationDetailsModal}
        onDismiss={hideSolicitationDetailsModal}
        isLoading={isLoadingSolicitation}
        solicitation={selectedSolicitation}
      />
    );
  }

  function renderWalletItem(item) {
    return (
      <TouchableOpacity
        onPress={() =>
          openSolicitationDetailsModal(item.appointment.solicitation)
        }
      >
        <WalletItem>
          <WalletItemHeader>
            <WalletItemSolicitationText>
              {item.appointment.solicitation.id}
              {' - '}
              {item.appointment.solicitation.customer.name}
            </WalletItemSolicitationText>
            <WalletItemDateText>
              {format(new Date(item.created_at), 'dd/MM - HH:mm')}
            </WalletItemDateText>
          </WalletItemHeader>
          <WalletItemBody>
            <Text>Valor total: </Text>
            <WalletItemValueText>
              {centsToNumberString(item.appointment.solicitation.value)}
            </WalletItemValueText>
            <Text>Valor da taxa: </Text>
            <WalletItemTaxValueText>
              {centsToNumberString(item.changed_balance * -1)}
            </WalletItemTaxValueText>
          </WalletItemBody>
          <WalletItemFooter>
            <WalletItemPaymentMethodContainer
              style={{
                backgroundColor: getPaymentMethodContainerBackgroundColor(
                  item.appointment.solicitation.payment_method
                ),
              }}
            >
              <WalletItemPaymentMethodText>
                {paymentMethodToString(
                  item.appointment.solicitation.payment_method
                )}
              </WalletItemPaymentMethodText>
            </WalletItemPaymentMethodContainer>
          </WalletItemFooter>
        </WalletItem>
      </TouchableOpacity>
    );
  }

  return (
    <Container>
      {renderSolicitationDetailsModal()}
      <Title>Histórico da carteira</Title>
      <WalletList
        data={walletHistory.data}
        keyExtractor={item => item.appointment.id}
        renderItem={({ item }) => renderWalletItem(item)}
      />
    </Container>
  );
}
