import { uiReducer } from "./uiReducer";
import { fromJS } from "immutable";
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/uiActionTypes";

const initialState = fromJS({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
});

describe("uiReducer", () => {
  it("should return the initial state", () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle DISPLAY_NOTIFICATION_DRAWER", () => {
    const action = { type: DISPLAY_NOTIFICATION_DRAWER };
    const expectedState = initialState.set("isNotificationDrawerVisible", true);
    expect(uiReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle HIDE_NOTIFICATION_DRAWER", () => {
    const action = { type: HIDE_NOTIFICATION_DRAWER };
    const expectedState = initialState.set("isNotificationDrawerVisible", false);
    expect(uiReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle LOGIN_SUCCESS", () => {
    const user = { email: "test@example.com" };
    const action = { type: LOGIN_SUCCESS, user };
    const expectedState = initialState.set("isUserLoggedIn", true).set("user", fromJS(user));
    expect(uiReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle LOGIN_FAILURE", () => {
    const action = { type: LOGIN_FAILURE };
    const expectedState = initialState.set("isUserLoggedIn", false);
    expect(uiReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle LOGOUT", () => {
    const action = { type: LOGOUT };
    const expectedState = initialState.set("isUserLoggedIn", false).set("user", fromJS({}));
    expect(uiReducer(initialState, action)).toEqual(expectedState);
  });

  it("should return current state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(uiReducer(initialState, action)).toEqual(initialState);
  });
});
