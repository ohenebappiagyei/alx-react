import React from "react";
import { shallow } from "enzyme";
import NotificationsContainer from "./NotificationsContainer";

describe("NotificationsContainer", () => {
  const mockProps = {
    fetchNotifications: jest.fn(),
    unreadNotifications: [],
  };

  it("fetches notifications on mount", () => {
    shallow(<NotificationsContainer {...mockProps} />);
    expect(mockProps.fetchNotifications).toHaveBeenCalled();
  });
});
