import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure, ActiveSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    //é cliente
    if (user.provider === false) {
      Alert.alert('Erro no login', 'O usuário ja possui cadastro como cliente');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* activeRequest({ payload }) {
  try {
    const { email, id } = payload;

    const response = yield call(api.put, `users/${id}`, {
      email,
      active: true,
    });

    const { active } = response.data;

    yield put(ActiveSuccess(active));

  } catch (err) {
    console.log('kakatey', err);
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload, navigation }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    Alert.alert('Sucesso!', 'Cadastro realizado com sucesso');
    navigation.navigate('SignIn');
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/ACTIVE_REQUEST', activeRequest),
]);
