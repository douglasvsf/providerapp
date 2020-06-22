import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {
  CenterContent,
  ButtonsContainer,
  RefuseButton,
  AcceptButton,
  RefuseButtonText,
  AcceptButtonText,
  Content,
  ContentTitle,
  DetailsContainer,
  DetailsText,
  NoteInput,
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

const AppointmentDetailsModal = ({ isVisible, onDismiss, solicitation }) => {
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
  return (
    <SolicitationModal
      isVisible={isVisible}
      onDismiss={onDismiss}
      useNativeDriver
    >
      <Content>
        <TitleContainer>
          <ContentTitle>Detalhes da solicitação </ContentTitle>
          <SolicitationIdText>#{solicitation.id}</SolicitationIdText>
        </TitleContainer>
        <DetailsContainer>
          <Title>Data</Title>
          <DetailsText>
            {format(new Date(solicitation.date), "dd 'de' MMMM 'de' yyyy", {
              locale: pt,
            })}
          </DetailsText>
          <Title>Observações</Title>
          <NoteInput
            editable={false}
            multiline
            numberOfLines={6}
            max
            maxLength={120}
            textAlignVertical="top"
            value={solicitation.note}
          />
          <Title>Localização</Title>
          <DetailsText>
            {solicitation.address_text || 'Localização não encontrada'}
          </DetailsText>
          <Title>Preço</Title>
          <DetailsText>
            {(solicitation.value / 100).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </DetailsText>
          <Title>Método de pagamento</Title>
          <DetailsText>
            {paymentMethodToString(solicitation.payment_method)}
          </DetailsText>
          {solicitation.payment_method === PaymentMethod.MONEY ? (
            <>
              <Title>Precisa de troco?</Title>
              <DetailsText style={{ marginBottom: 0 }}>
                {solicitation.change_money
                  ? `Sim, para ${(
                      solicitation.change_money / 100
                    ).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}`
                  : 'Não'}
              </DetailsText>
            </>
          ) : null}
        </DetailsContainer>

        <ButtonsContainer>
          <RefuseButton onPress={() => onDismiss()}>
            <RefuseButtonText>Fechar</RefuseButtonText>
          </RefuseButton>
          <AcceptButton
            onPress={() =>
              Alert.alert('Atenção', 'Funcionalidade em fase de implementação')
            }
          >
            <AcceptButtonText>Finalizar Serviço</AcceptButtonText>
          </AcceptButton>
        </ButtonsContainer>
      </Content>
    </SolicitationModal>
  );
};

export default AppointmentDetailsModal;
