import database from '@react-native-firebase/database';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import api from '~/services/api';
import { centsToNumberString } from '~/utils/formatNumber';
import {
  AcceptButton,
  AcceptButtonText,
  ButtonsContainer,
  CenterContent,
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
import { updateAppointmentsRequest } from '~/store/modules/user/actions';

const PaymentMethod = {
  ONLINE: 'online_payment',
  MONEY: 'cash',
  CREDIT_CARD: 'machine_credit',
  DEBIT_CARD: 'machine_debit',
};

const SolicitationDetailsModal = ({
  isVisible,
  onDismiss,
  isLoading,
  solicitation,
  navigation,
}) => {
  const dispatch = useDispatch();

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

  async function requestCreateAppointment() {
    const { data: appointment } = await api.post('/appointments', {
      solicitation_id: solicitation.id,
    });

    return appointment;
  }

  async function verifyOnline() {
  const result = await api
    .get(`gateway/verify_recipient `)
    .then(response => {
      console.log('responms' , response);
      console.log('responmseeeeeee' , response.data.message);
      if(response.data.message === 'Provider gateway not found'){
        console.log('ENTROIF' , response);
        return false;
      }else if(response.data.message == 'Provider gateway found'){
        return true;
      }
    })
    .catch(err => {
      console.log('erro' , err);
    });
 return result;
    
  }

  async function updateSolicitationOnFirebase(status) {
    const firebaseMessagesRef = database().ref(
      `/chat/${solicitation.chat_id}/messages`
    );

    firebaseMessagesRef
      .orderByChild('messageType')
      .equalTo('solicitation')
      .limitToLast(1)
      .once('value', snapshot => {
        try {
          const childrens = snapshot.val();

          if (!childrens) return;

          const key = Object.keys(childrens)[0];
          const solicitationMessage = childrens[key];

          if (solicitationMessage.status === 'undefined') {
            const solicitationMessageRef = database().ref(
              `/chat/${solicitation.chat_id}/messages/${key}`
            );

            solicitationMessageRef.update({ status });
          }
        } catch (error) {
          console.log(error);
        }
      });
  }

  async function acceptSolicitation() {
    try {

      if(solicitation.payment_method == 'online_payment'){

        const verifyBank = await verifyOnline();
        console.log('verifyBank', verifyBank);
        if (!verifyBank) {
          Alert.alert(
            'Aviso',
            'É necessário cadastrar uma conta bancária para aceitar solicitações online',
            [
              {
                text: 'Voltar',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Ir para o cadastro',
                onPress: () => {
                  onDismiss();
                  navigation.navigate('Wallet');
               },
              },
            ],
            { cancelable: true }
          );
          return;
        }
        
      }

      const appointment = await requestCreateAppointment();

      if (!appointment) {
        Alert.alert('Erro', 'Erro ao criar agendamento');
        return;
      }

      updateSolicitationOnFirebase('accepted');
      dispatch(updateAppointmentsRequest());

      onDismiss();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao aceitar solicitação');
    }
  }

  async function rejectSolicitation() {
    try {
      const { data: rejectedSolicitation } = await api.put(
        `/solicitation/${solicitation.id}`,
        { status: 'not_accepted' }
      );

      if (!rejectedSolicitation) {
        Alert.alert('Erro', 'Erro ao atualizar status da solicitação');
        return;
      }

      updateSolicitationOnFirebase('not_accepted');

      onDismiss();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao recusar solicitação');
    }
  }

  return (
    <SolicitationModal
      isVisible={isVisible}
      onDismiss={onDismiss}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      useNativeDriver
    >
      {isLoading ? (
        <CenterContent>
          <ActivityIndicator size="large" />
        </CenterContent>
      ) : null}

      {!isLoading && solicitation ? (
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
            <DetailsText>{centsToNumberString(solicitation.value)}</DetailsText>
            <Title>Método de pagamento</Title>
            <DetailsText>
              {paymentMethodToString(solicitation.payment_method)}
            </DetailsText>
            {solicitation.payment_method === PaymentMethod.MONEY ? (
              <>
                <Title>Precisa de troco?</Title>
                <DetailsText style={{ marginBottom: 0 }}>
                  {solicitation.change_money
                    ? `Sim, para ${centsToNumberString(
                        solicitation.change_money
                      )}`
                    : 'Não'}
                </DetailsText>
              </>
            ) : null}
          </DetailsContainer>
          {solicitation.status === 'undefined' && (
            <ButtonsContainer>
              <RefuseButton onPress={() => rejectSolicitation()}>
                <RefuseButtonText>Recusar</RefuseButtonText>
              </RefuseButton>
              <AcceptButton onPress={() => acceptSolicitation()}>
                <AcceptButtonText>Aceitar</AcceptButtonText>
              </AcceptButton>
            </ButtonsContainer>
          )}
        </Content>
      ) : null}
    </SolicitationModal>
  );
};

export default SolicitationDetailsModal;
