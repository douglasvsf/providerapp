import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React from 'react';
import { Alert, Text } from 'react-native';
import api from '~/services/api';
import { centsToNumberString } from '~/utils/formatNumber';
import { PaymentStatusContainer } from '../styles';
import {
  AcceptButton,
  AcceptButtonText,
  ButtonsContainer,
  Content,
  ContentTitle,
  DetailsContainer,
  DetailsText,
  NoteInput,
  RefuseButton,
  RefuseButtonText,
  SolicitationIdText,
  SolicitationModal,
  Title,
  TitleContainer,
} from './styles';

const PaymentMethod = {
  ONLINE: 'online_payment',
  MONEY: 'cash',
  CREDIT_CARD: 'machine_credit',
  DEBIT_CARD: 'machine_debit',
};

const AppointmentDetailsModal = ({ isVisible, onDismiss, appointment }) => {
  function paymentMethodToString(paymentMethod) {
    switch (paymentMethod) {
      case PaymentMethod.ONLINE:
        return 'Online';
      case PaymentMethod.MONEY:
        return 'Dinheiro';
      case PaymentMethod.CREDIT_CARD:
        return 'Cartão de crédito';
      case PaymentMethod.DEBIT_CARD:
        return 'Cartão de débito';
      default:
        return 'Tipo de pagamento inválido';
    }
  }

  async function requestSetPaymentStatus(status) {
    try {
      await api.put(
        `/appointments/${appointment.id}/set_payment_status/${status}`
      );
      onDismiss();
    } catch (error) {
      console.log(error.response);
      Alert.alert('Erro', 'Não foi possível finalizar o serviço');
    }
  }

  function finishService() {
    Alert.alert(
      'Finalizar serviço',
      'O pagamento do serviço foi realizado?',
      [
        {
          text: 'Voltar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Não',
          onPress: () => requestSetPaymentStatus('refused'),
        },
        {
          text: 'Sim',
          onPress: () => requestSetPaymentStatus('success'),
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <SolicitationModal
      isVisible={isVisible}
      onDismiss={onDismiss}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      useNativeDriver
    >
      <Content>
        <TitleContainer>
          <ContentTitle>Detalhes da solicitação </ContentTitle>
          <SolicitationIdText>
            #{appointment.solicitation.id}
          </SolicitationIdText>
          {appointment.payment_status === 'success' ? (
            <PaymentStatusContainer>
              <Text>pago</Text>
            </PaymentStatusContainer>
          ) : null}
        </TitleContainer>
        <DetailsContainer>
          <Title>Data</Title>
          <DetailsText>
            {format(
              new Date(appointment.solicitation.date),
              "dd 'de' MMMM 'de' yyyy",
              {
                locale: pt,
              }
            )}
          </DetailsText>
          <Title>Observações</Title>
          <NoteInput
            editable={false}
            multiline
            numberOfLines={6}
            max
            maxLength={120}
            textAlignVertical="top"
            value={appointment.solicitation.note}
          />
          <Title>Localização</Title>
          <DetailsText>
            {appointment.solicitation.address_text ||
              'Localização não encontrada'}
          </DetailsText>
          <Title>Preço</Title>
          <DetailsText>
            {centsToNumberString(appointment.solicitation.value)}
          </DetailsText>
          <Title>Método de pagamento</Title>
          <DetailsText>
            {paymentMethodToString(appointment.solicitation.payment_method)}
          </DetailsText>
          {appointment.solicitation.payment_method === PaymentMethod.MONEY ? (
            <>
              <Title>Precisa de troco?</Title>
              <DetailsText style={{ marginBottom: 0 }}>
                {appointment.solicitation.change_money
                  ? `Sim, para ${centsToNumberString(
                      appointment.solicitation.change_money
                    )} `
                  : 'Não'}
              </DetailsText>
            </>
          ) : null}
        </DetailsContainer>

        <ButtonsContainer>
          <RefuseButton onPress={() => onDismiss()}>
            <RefuseButtonText>Fechar</RefuseButtonText>
          </RefuseButton>
          {appointment.solicitation.payment_method !== PaymentMethod.ONLINE &&
          appointment.payment_status !== 'success' ? (
            <AcceptButton onPress={() => finishService()}>
              <AcceptButtonText>Finalizar Serviço</AcceptButtonText>
            </AcceptButton>
          ) : null}
        </ButtonsContainer>
      </Content>
    </SolicitationModal>
  );
};

export default AppointmentDetailsModal;
