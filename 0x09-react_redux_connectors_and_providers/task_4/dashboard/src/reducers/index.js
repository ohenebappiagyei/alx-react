import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import notificationReducer from './notificationReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  ui: uiReducer,
  notifications: notificationReducer,
  courses: courseReducer,
});
