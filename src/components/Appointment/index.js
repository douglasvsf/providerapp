import React, { useMemo, useState } from 'react';
import { parseISO, formatRelative, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppointmentDetailsModal from './AppointmentDetails';
import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const [
    showSolicitationDetailsModal,
    setShowSolicitationDetailsModal,
  ] = useState(false);
  const dateParsed = useMemo(() => {
    return format(parseISO(data.solicitation.date), 'dd/MM/yyyy');
    // formatRelative(parseISO(data.solicitation.date), new Date(), {
    //   locale: pt,
    //   addSuffix: true,
    // });
  }, [data.solicitation.date]);

  const showOrderModal = () => {
    setShowSolicitationDetailsModal(true);
  };

  const hideOrderModal = () => {
    setShowSolicitationDetailsModal(false);
  };

  return (
    <>
      <AppointmentDetailsModal
        isVisible={showSolicitationDetailsModal}
        onDismiss={hideOrderModal}
        solicitation={data.solicitation}
      />

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

        <TouchableOpacity onPress={showOrderModal}>
          <Icon name="info" size={20} color="#0000ff" />
        </TouchableOpacity>

        {data.cancelable && !data.canceled_at && (
          <TouchableOpacity onPress={onCancel}>
            <Icon name="event-busy" size={20} color="#f64c75" />
          </TouchableOpacity>
        )}
      </Container>
    </>
  );
}
