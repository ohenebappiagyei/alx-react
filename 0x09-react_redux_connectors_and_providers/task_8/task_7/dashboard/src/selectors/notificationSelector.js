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

// New selector to get unread notifications by type
export const getUnreadNotificationsByType = createSelector(
  [getNotifications, filterTypeSelected],
  (notifications, filter) => {
    if (!notifications) return [];

    // Apply filter based on filter type
    switch (filter) {
      case "urgent":
        return notifications.filter(
          (notification) =>
            !notification.get("isRead") && notification.get("type") === "urgent"
        );
      default:
        return notifications.filter((notification) => !notification.get("isRead"));
    }
  }
);
