import messaging from '@react-native-firebase/messaging';
import Snackbar from 'react-native-snackbar';
import NavigationService from './NavigationService';

export default class NotificationManager {
  constructor(profile) {
    this.profile = profile;
  }

  openChat(user, customer) {
    NavigationService.navigate('enterRoom', {
      user: {
        _id: this.profile.id,
        name: this.profile.name,
        firstName: this.profile.name,
        lastName: this.profile.name,
        ...user,
      },
      customer,
      openChat: true,
    });
  }

  static openAppointmentDetails(appointment) {
    NavigationService.navigate('Agendamentos', {
      appointment,
    });
  }

  static openWallet() {
    NavigationService.navigate('Wallet', {});
  }

  showSnackBar(remoteMessage) {
    switch (remoteMessage?.data?.type) {
      case 'new-appointment-chat':
      case 'new-solicitation':
        Snackbar.show({
          text: remoteMessage.notification.body,
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'Abrir',
            textColor: 'green',
            onPress: () =>
              this.openChat(
                JSON.parse(remoteMessage.data.user),
                JSON.parse(remoteMessage.data.customer)
              ),
          },
        });
        break;
      case 'payment-confirmation-request':
      case 'payment-confirmation':
      case 'payment-success':
      case 'payment-refused':
      case 'payment-error':
        Snackbar.show({
          text: remoteMessage.notification.body,
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'Abrir',
            textColor: 'green',
            onPress: () =>
              NotificationManager.openAppointmentDetails(
                JSON.parse(remoteMessage.data.appointment)
              ),
          },
        });
        break;
      case 'payment-slip-success':
        Snackbar.show({
          text: remoteMessage.notification.body,
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'Abrir carteira',
            textColor: 'green',
            onPress: () => NotificationManager.openWallet(),
          },
        });
        break;
      default:
    }
  }

  listenForegroundNotifications() {
    messaging().onMessage(async remoteMessage => {
      this.showSnackBar(remoteMessage);
    });
  }

  onPushNotificationClick(remoteMessage) {
    switch (remoteMessage?.data?.type) {
      case 'new-appointment-chat':
      case 'new-solicitation':
        this.openChat(
          JSON.parse(remoteMessage.data.user),
          JSON.parse(remoteMessage.data.customer)
        );
        break;
      case 'payment-confirmation-request':
      case 'payment-confirmation':
      case 'payment-success':
      case 'payment-refused':
      case 'payment-error':
        NotificationManager.openAppointmentDetails(
          JSON.parse(remoteMessage.data.appointment)
        );
        break;
      case 'payment-slip-success':
        NotificationManager.openWallet();
        break;
      default:
    }
  }

  async listenToNotificationClick() {
    const remoteMessage = await messaging().getInitialNotification();

    if (remoteMessage) {
      this.onPushNotificationClick(remoteMessage);
    }
  }
}
