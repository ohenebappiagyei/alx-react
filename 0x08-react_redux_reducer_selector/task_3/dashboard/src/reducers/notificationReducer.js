import {
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_AS_READ,
    SET_TYPE_FILTER,
    NotificationTypeFilters,
  } from "./notificationActionTypes";
  
  const initialState = {
    filter: NotificationTypeFilters.DEFAULT,
    notifications: [],
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NOTIFICATIONS_SUCCESS:
        const notifications = action.data.map((notification) => ({
          ...notification,
          isRead: false,
        }));
        return {
          ...state,
          notifications,
        };
  
      case MARK_AS_READ:
        const updatedNotifications = state.notifications.map((notification, index) =>
          index === action.index ? { ...notification, isRead: true } : notification
        );
        return {
          ...state,
          notifications: updatedNotifications,
        };
  
      case SET_TYPE_FILTER:
        return {
          ...state,
          filter: action.filter,
        };
  
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  