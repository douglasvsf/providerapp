export function signInRequest(email, password, navigation) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
    navigation,
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function ActiveRequest(email, id) {
  return {
    type: '@auth/ACTIVE_REQUEST',
    payload: { email, id },
  };
}

export function ActiveSuccess(active) {
  return {
    type: '@auth/ACTIVE_SUCCESS',
    payload: { active },
  };
}

export function signUpRequest(name, email, password, navigation) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password },
    navigation,
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
