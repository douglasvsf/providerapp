import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const token = useSelector(state => state.auth.token);
  const active = useSelector(state => state.auth.active);
  const profileId = useSelector(state => state.user.profile);
  const Routes = createRouter(signed, token, profileId, active);

  async function saveTokenToDatabase(fcmToken) {
    const userId = auth().currentUser.uid;

    await database()
      .ref(`users/${userId}`)
      .update({ token: fcmToken });
  }

  useEffect(() => {
    async function onAuthStateChanged(user) {
      if (!user) return;

      const fcmToken = await messaging().getToken();

      saveTokenToDatabase(fcmToken);

      messaging().onTokenRefresh(newToken => {
        saveTokenToDatabase(newToken);
      });
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return <Routes />;
}
