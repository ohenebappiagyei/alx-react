import { createSelector } from "reselect";

// Select the slice of state managed by the Notifications reducer
const selectNotifications = (state) => state.notifications;

// Selector to get the current filter type selected
export const filterTypeSelected = createSelector(
  [selectNotifications],
  (notifications) => notifications.get("filter")
);

// Selector to get all notifications
export const getNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.get("notifications")
);

// Selector to get unread notifications
export const getUnreadNotifications = createSelector(
  [getNotifications],
  (notifications) => {
    if (!notifications) return [];

    return notifications.filter((notification) => !notification.get("isRead"));
  }
);
