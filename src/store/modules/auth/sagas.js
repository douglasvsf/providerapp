import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';

import api from '~/services/api';
import { signInSuccess, signFailure, ActiveSuccess } from './actions';
import NavigationService from "~/NavigationService";


export function* signIn({ payload }) {
  const { email, password } = payload;

  try {

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    // é cliente
    if (user.provider === false) {
      Alert.alert('Erro no login', 'O email ja possui cadastro como cliente');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          auth().createUserWithEmailAndPassword(email, password);
        }
      });

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {

    if(err.response.status === 406) {
      NavigationService.navigate("ValidAccount", { email, password });
    } else {

      Alert.alert('Falha na autenticação', 'Email ou senha incorretos');
    }

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

    Alert.alert('Falha na autenticação', 'Email ou senha incorretos');

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

    NavigationService.navigate("ValidAccount", { email, password });

  } catch (err) {
    console.log(err.response.data);
    if (err.response.data.error === 'User already exists.') {
      Alert.alert('Falha no cadastro', 'Email ja utilizado');
    } else if (err.response.data.error === 'Validation fails') {
      Alert.alert(
        'Falha no cadastro',
        'Senha deve possuir no mínimo 6 caracteres'
      );
    }

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

export function signOut() {
  auth().signOut();
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/ACTIVE_REQUEST', activeRequest),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
