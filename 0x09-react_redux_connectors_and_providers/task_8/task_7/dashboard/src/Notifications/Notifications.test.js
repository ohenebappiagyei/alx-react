// Update imports to include necessary modules and selectors
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from "aphrodite";
import { getLatestNotification } from "../utils/utils";
import { fetchNotifications } from "../actions/notificationActionCreators";
import { markAsRead } from "../actions/notificationActionCreators";
import { getUnreadNotifications } from "../selectors/notificationSelectors";

// Mock props and context
const listNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: getLatestNotification() },
];

const mockProps = {
  displayDrawer: true,
  unreadNotifications: listNotifications,
  handleDisplayDrawer: jest.fn(),
  handleHideDrawer: jest.fn(),
  markAsRead: jest.fn(),
  fetchNotifications: jest.fn(),
};

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Notification tests", () => {
  it("renders Notification component without crashing", () => {
    const wrapper = shallow(<Notifications {...mockProps} />);

    expect(wrapper).toBeDefined();
  });

  it("renders correct list items", () => {
    const wrapper = shallow(<Notifications {...mockProps} />);
    expect(wrapper.find("ul").children()).toHaveLength(listNotifications.length);
    expect(wrapper.find(NotificationItem)).toHaveLength(listNotifications.length);
  });

  it("renders an unordered list", () => {
    const wrapper = shallow(<Notifications {...mockProps} />);
    expect(wrapper.find("ul")).toHaveLength(1);
  });

  it("displays correct text when no notifications are present", () => {
    const wrapper = shallow(<Notifications {...mockProps} unreadNotifications={[]} />);
    expect(wrapper.find("ul").children()).toHaveLength(1); // Check for the "No new notification for now" message
  });

  it("displays menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications {...mockProps} displayDrawer={false} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(true);
  });

  it("does not display notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications {...mockProps} displayDrawer={false} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(false);
  });

  it("calls handleDisplayDrawer when menu item is clicked", () => {
    const wrapper = shallow(<Notifications {...mockProps} />);
    wrapper.find("div.menuItem").simulate("click");
    expect(mockProps.handleDisplayDrawer).toHaveBeenCalled();
  });

  it("calls handleHideDrawer when close button is clicked", () => {
    const wrapper = shallow(<Notifications {...mockProps} />);
    wrapper.find("button").simulate("click");
    expect(mockProps.handleHideDrawer).toHaveBeenCalled();
  });

  it("calls markAsRead when markAsRead is invoked", () => {
    const wrapper = shallow(<Notifications {...mockProps} />);
    wrapper.find(NotificationItem).first().props().markAsRead();
    expect(mockProps.markAsRead).toHaveBeenCalledWith(listNotifications[0].id);
  });

  it("calls fetchNotifications on mount", () => {
    shallow(<Notifications {...mockProps} />);
    expect(mockProps.fetchNotifications).toHaveBeenCalled();
  });
});
