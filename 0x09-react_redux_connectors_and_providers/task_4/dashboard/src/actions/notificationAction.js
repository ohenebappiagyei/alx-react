import {
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_AS_READ,
    SET_TYPE_FILTER,
  } from "./notificationActionTypes";
  
  export const fetchNotificationsSuccess = (data) => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data,
  });
  
  export const markAsRead = (index) => ({
    type: MARK_AS_READ,
    index,
  });
  
  export const setTypeFilter = (filter) => ({
    type: SET_TYPE_FILTER,
    filter,
  });
  