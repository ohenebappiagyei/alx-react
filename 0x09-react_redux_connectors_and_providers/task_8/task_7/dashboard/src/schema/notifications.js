import { schema, normalize } from "normalizr";
import * as notificationData from "../../dist/notifications.json";

const user = new schema.Entity("users");
const message = new schema.Entity("messages", {}, { idAttribute: "guid" });
const notificationSchema = new schema.Entity("notifications", {
  author: user,
  context: message,
});

export function notificationsNormalizer(data) {
  return normalize(data, [notificationSchema]);
}

// Normalize notifications from JSON data
const normalized = notificationsNormalizer(notificationData);

// Example function to get notifications by user (if needed)
export function getAllNotificationsByUser(userId) {
  const output = [];
  const notifications = normalized.entities.notifications;
  const messages = normalized.entities.messages;

  for (const id in notifications) {
    if (notifications[id].author === userId) {
      output.push(messages[notifications[id].context]);
    }
  }

  return output;
}

export default normalized;
