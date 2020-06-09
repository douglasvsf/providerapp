import NavigationService from './NavigationService';

export default function createNotificationManager(profile) {
  function openChat(user, customer) {
    NavigationService.navigate('Chat', {
      user: {
        _id: profile.id,
        name: profile.name,
        firstName: profile.name,
        lastName: profile.name,
        ...user,
      },
      customer,
    });
  }

  function showToastNotification() {}

  function onPushNotificationClick(remoteMessage) {
    switch (remoteMessage?.data?.type) {
      case 'new-appointment-chat':
        openChat(
          JSON.parse(remoteMessage.data.user),
          JSON.parse(remoteMessage.data.customer)
        );
        break;
      default:
    }
  }

  function onToastNotificationClick() {}

  return {
    showToastNotification,
    onPushNotificationClick,
    onToastNotificationClick,
  };
}
