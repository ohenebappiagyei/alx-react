import { Map } from "immutable";
import { filterTypeSelected, getNotifications, getUnreadNotifications } from "./notificationSelector";

describe("notification selectors", () => {
  const initialState = Map({
    filter: "DEFAULT",
    notifications: Map({
      1: { id: 1, type: "default", value: "New course available", isRead: false },
      2: { id: 2, type: "urgent", value: "New resume available", isRead: false },
      3: { id: 3, type: "urgent", value: "New data available", isRead: true },
    }),
  });

  it("should return the filter type selected", () => {
    const result = filterTypeSelected(initialState);
    expect(result).toEqual("DEFAULT");
  });

  it("should return the list of notifications", () => {
    const result = getNotifications(initialState);
    expect(result.size).toEqual(3); // Assuming 3 notifications in initial state
    expect(result.get(1)).toEqual(Map({ id: 1, type: "default", value: "New course available", isRead: false }));
    expect(result.get(2)).toEqual(Map({ id: 2, type: "urgent", value: "New resume available", isRead: false }));
    expect(result.get(3)).toEqual(Map({ id: 3, type: "urgent", value: "New data available", isRead: true }));
  });

  it("should return the list of unread notifications", () => {
    const result = getUnreadNotifications(initialState);
    expect(result.size).toEqual(2); // Assuming 2 unread notifications in initial state
    expect(result.get(1)).toEqual(Map({ id: 1, type: "default", value: "New course available", isRead: false }));
    expect(result.get(2)).toEqual(Map({ id: 2, type: "urgent", value: "New resume available", isRead: false }));
  });
});
