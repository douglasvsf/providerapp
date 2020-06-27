import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import Appointment from '~/components/Appointment';
import AppointmentDetailsModal from '~/components/Appointment/AppointmentDetails';
import Background from '~/components/Background';
import api from '~/services/api';
import { colors } from '~/values/colors';
import { Container, List, Title } from './styles';

function Dashboard({ isFocused, navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [
    showSolicitationDetailsModal,
    setShowSolicitationDetailsModal,
  ] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const profileId = useSelector(state => state.user.profile.id);

  function showOrderModal(appointment) {
    setSelectedAppointment(appointment);
    setShowSolicitationDetailsModal(true);
  }

  function hideOrderModal() {
    setSelectedAppointment(null);
    setShowSolicitationDetailsModal(false);
  }

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get(`providers/${profileId}/appointments`);

      setAppointments(response.data);
    }

    const appointment = navigation.getParam('appointment');

    if (appointment) {
      showOrderModal(appointment);
    }

    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused, navigation, profileId]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      {selectedAppointment ? (
        <AppointmentDetailsModal
          isVisible={showSolicitationDetailsModal}
          onDismiss={hideOrderModal}
          appointment={selectedAppointment}
        />
      ) : null}

      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showOrderModal(item)}>
              <Appointment onCancel={() => handleCancel(item.id)} data={item} />
            </TouchableOpacity>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
