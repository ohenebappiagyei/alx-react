import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import notificationsReducer from './notificationReducer';
import coursesReducer from './courseReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  notifications: notificationsReducer,
  courses: coursesReducer,
});

export default rootReducer;