import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavigationService from './NavigationService';
import NotificationManager from './NotificationManager';
import createRouter from './routes';
import api from '~/services/api';
export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const token = useSelector(state => state.auth.token);
  const active = useSelector(state => state.auth.active);
  const profile = useSelector(state => state.user.profile);
  const Routes = createRouter(signed, token, profile, active);

  useEffect(() => {
    const notificationManager = new NotificationManager(profile);

    notificationManager.listenForegroundNotifications();
    NotificationManager.listenBackgroundNotifications();
    notificationManager.listenToNotificationClick();
  }, [profile]);

  useEffect(() => {
    async function saveTokenToDatabase(fcmToken) {
      const userId = auth().currentUser.uid;

      await firestore()
        .collection('tokens')
        .doc(userId)
        .set(
          {
            tokens: firestore.FieldValue.arrayUnion(fcmToken),
          },
          { merge: true }
        );
    }

    async function onAuthStateChanged(user) {
      if (!user) return;

      const fcmToken = await messaging().getToken();

      saveTokenToDatabase(fcmToken);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      messaging().onTokenRefresh(newToken => {
        saveTokenToDatabase(newToken);
      });
    }

    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <Routes
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}
