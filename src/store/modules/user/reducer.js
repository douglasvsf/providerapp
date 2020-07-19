import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  appointments: [],
  loadingAppointments: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      case '@user/UPDATE_APPOINTMENTS_REQUEST': {
        draft.loadingAppointments = true;
        break;
      }
      case '@user/UPDATE_APPOINTMENTS_SUCCESS': {
        draft.appointments = action.payload.appointments;
        draft.loadingAppointments = false;
        break;
      }
      case '@user/UPDATE_APPOINTMENTS_FAILURE': {
        draft.loadingAppointments = false;
        break;
      }
      default:
    }
  });
}
