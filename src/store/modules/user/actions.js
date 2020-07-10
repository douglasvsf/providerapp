export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

export function updateAppointmentsRequest(data) {
  return {
    type: '@user/UPDATE_APPOINTMENTS_REQUEST',
    payload: { data },
  };
}

export function updateAppointmentsSuccess(appointments) {
  return {
    type: '@user/UPDATE_APPOINTMENTS_SUCCESS',
    payload: { appointments },
  };
}

export function updateAppointmentsFailure() {
  return {
    type: '@user/UPDATE_APPOINTMENTS_FAILURE',
  };
}
