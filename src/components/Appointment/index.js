import { format, parseISO } from 'date-fns';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Avatar,
  Container,
  Info,
  InfoView,
  Left,
  Name,
  PaymentStatusContainer,
  PaymentStatusContainerR,
  PaymentStatusContainerA,
  Time,
} from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.solicitation.date), 'dd/MM/yyyy');
    // formatRelative(parseISO(data.solicitation.date), new Date(), {
    //   locale: pt,
    //   addSuffix: true,
    // });
  }, [data.solicitation.date]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatar/50/${data.id}.png`,
          }}
        />

        <Info>
          <Name>{data.solicitation.customer.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>
      <InfoView>
        <Icon name="info" size={20} color="#0000ff" />
        {data.payment_status === 'success' ? (
          <PaymentStatusContainer>
            <Text>pago</Text>
          </PaymentStatusContainer>
        ) : data.payment_status === 'refused' ? (
          <PaymentStatusContainerR>
            <Text>Recusado</Text>
          </PaymentStatusContainerR>
        ) : <PaymentStatusContainerA>
        <Text>Em Andamento</Text>
      </PaymentStatusContainerA>}
      </InfoView>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
