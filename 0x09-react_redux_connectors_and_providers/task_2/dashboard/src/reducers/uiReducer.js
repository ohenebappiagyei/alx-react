import { Map } from 'immutable';
import { 
  DISPLAY_NOTIFICATION_DRAWER, 
  HIDE_NOTIFICATION_DRAWER, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT,
  LOGIN
} from '../actions/uiActionTypes';

const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: null, // Initialize user as null
});

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', true);
    case HIDE_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', false);
    case LOGIN_SUCCESS:
      return state.set('isUserLoggedIn', true);
    case LOGIN_FAILURE:
    case LOGOUT:
      return state.merge({
        isUserLoggedIn: false,
        user: null, // Reset user to null on logout or login failure
      });
    case LOGIN:
      return state.merge({
        isUserLoggedIn: true,
        user: action.user, // Set user to the one passed in the action
      });
    default:
      return state;
  }
};

export default uiReducer;
