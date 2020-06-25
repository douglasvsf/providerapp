import { format, parseISO } from 'date-fns';
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Container, Info, Left, Name, Time } from './styles';

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
          <Name> Cliente Numero : {data.solicitation.customer_id}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      <Icon name="info" size={20} color="#0000ff" />

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
