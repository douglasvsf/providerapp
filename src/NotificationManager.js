import messaging from '@react-native-firebase/messaging';
import Snackbar from 'react-native-snackbar';
import NavigationService from './NavigationService';

export default class NotificationManager {
  constructor(profile) {
    this.profile = profile;
  }

  openChat(user, customer) {
    NavigationService.navigate('Chat', {
      user: {
        _id: this.profile.id,
        name: this.profile.name,
        firstName: this.profile.name,
        lastName: this.profile.name,
        ...user,
      },
      customer,
    });
  }

  showSnackBar(remoteMessage) {
    switch (remoteMessage?.data?.type) {
      case 'new-appointment-chat':
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
        this.openChat(
          JSON.parse(remoteMessage.data.user),
          JSON.parse(remoteMessage.data.customer)
        );
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
