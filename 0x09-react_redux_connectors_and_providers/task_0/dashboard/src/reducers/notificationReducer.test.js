import notificationReducer from "./notificationReducer";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from "./notificationActionTypes";

describe("notificationReducer", () => {
  const initialState = {
    filter: "DEFAULT",
    notifications: [],
  };

  it("should return the initial state", () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_NOTIFICATIONS_SUCCESS", () => {
    const notificationsData = [
      {
        id: 1,
        type: "default",
        value: "New course available",
      },
      {
        id: 2,
        type: "urgent",
        value: "New resume available",
      },
    ];
    const action = { type: FETCH_NOTIFICATIONS_SUCCESS, data: notificationsData };
    const expectedState = {
      filter: "DEFAULT",
      notifications: [
        { id: 1, type: "default", value: "New course available", isRead: false },
        { id: 2, type: "urgent", value: "New resume available", isRead: false },
      ],
    };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle MARK_AS_READ", () => {
    const initialState = {
      filter: "DEFAULT",
      notifications: [
        { id: 1, type: "default", value: "New course available", isRead: false },
        { id: 2, type: "urgent", value: "New resume available", isRead: false },
      ],
    };
    const action = { type: MARK_AS_READ, index: 1 };
    const expectedState = {
      filter: "DEFAULT",
      notifications: [
        { id: 1, type: "default", value: "New course available", isRead: false },
        { id: 2, type: "urgent", value: "New resume available", isRead: true },
      ],
    };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_TYPE_FILTER", () => {
    const initialState = {
      filter: "DEFAULT",
      notifications: [],
    };
    const action = { type: SET_TYPE_FILTER, filter: "URGENT" };
    const expectedState = {
      filter: "URGENT",
      notifications: [],
    };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });
});
