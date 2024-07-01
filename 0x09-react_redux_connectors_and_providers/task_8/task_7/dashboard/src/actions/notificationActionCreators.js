import { NotificationTypeFilters, MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS, SET_LOADING_STATE } from "./notificationActionTypes";

// Existing action creators
export const markAsRead = (index) => {
  return {
    type: MARK_AS_READ,
    index,
  };
};

export const boundMarkAsRead = (index) => dispatch(markAsRead(index));

export const setNotificationFilter = (filter) => {
  return {
    type: SET_TYPE_FILTER,
    filter,
  };
};

export const boundSetNotificationFilter = (filter) => dispatch(setNotificationFilter(filter));

// New action creators

// Action creator to set loading state
export const setLoadingState = (isLoading) => ({
  type: SET_LOADING_STATE,
  isLoading,
});

// Action creator to set notifications
export const setNotifications = (data) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  data,
});

// Action creator to fetch notifications
export const fetchNotifications = () => {
  return (dispatch) => {
    dispatch(setLoadingState(true));
    fetch('/notifications.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setNotifications(data));
        dispatch(setLoadingState(false));
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        dispatch(setLoadingState(false));
      });
  };
};
