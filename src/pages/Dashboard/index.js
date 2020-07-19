import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import Appointment from '~/components/Appointment';
import AppointmentDetailsModal from '~/components/Appointment/AppointmentDetails';
import Background from '~/components/Background';
import api from '~/services/api';
import { colors } from '~/values/colors';
import { Container, List, Title } from './styles';
import { updateAppointmentsRequest } from '~/store/modules/user/actions';

function Dashboard({ isFocused, navigation }) {
  const appointments = useSelector(state => state.user.appointments);
  const [
    showSolicitationDetailsModal,
    setShowSolicitationDetailsModal,
  ] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const profileId = useSelector(state => state.user.profile.id);
  const dispatch = useDispatch();

  function showOrderModal(appointment) {
    setSelectedAppointment(appointment);
    setShowSolicitationDetailsModal(true);
  }

  function hideOrderModal() {
    setSelectedAppointment(null);
    setShowSolicitationDetailsModal(false);
  }

  const loadAppointments = useCallback(() => {
    dispatch(updateAppointmentsRequest(profileId));
  }, [dispatch, profileId]);

  useEffect(() => {
    const appointment = navigation.getParam('appointment');

    if (appointment) {
      showOrderModal(appointment);
    }

    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused, loadAppointments, navigation, profileId]);

  async function handleCancel(id) {
    await api.delete(`appointments/${id}`);

    dispatch(updateAppointmentsRequest(profileId));
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
