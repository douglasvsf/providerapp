import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, profileid, active, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email, active },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, `users/${profileid}`, profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    if (err.response.data.error === 'Password does not match') {
      Alert.alert('Falha na atualização', 'Senha Incorreta');
    } else if (err.response.data.error === 'Email already exists.') {
      Alert.alert('Falha no cadastro', 'Email ja utilizado');
    } else if (err.response.data.error === 'Validation fails') {
      Alert.alert('Falha na atualização', 'Confirmação de senha incorreta');
    } else {
      Alert.alert('Falha na atualização', 'Entre em Contato com o Suporte');
    }

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
