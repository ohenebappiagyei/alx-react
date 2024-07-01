import { Map } from 'immutable';
import { notificationsNormalizer } from '../schema/notifications';
import { FETCH_NOTIFICATIONS_SUCCESS, SET_LOADING_STATE, MARK_AS_READ, SET_TYPE_FILTER } from '../actions/notificationActionTypes';

const initialState = Map({
  filter: 'DEFAULT',
  notifications: Map(),
  loading: false,  // Added loading attribute to initial state
});

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);
      return state.mergeDeep({
        notifications: normalizedData.entities.notifications,
        filter: 'DEFAULT',
      });
    case SET_LOADING_STATE:
      return state.set('loading', action.isLoading);
    case MARK_AS_READ:
      return state.setIn(['notifications', action.index, 'isRead'], true);
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    default:
      return state;
  }
};

export default notificationReducer;
