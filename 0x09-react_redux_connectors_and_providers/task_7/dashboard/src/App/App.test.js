/**
 * @jest-environment jsdom
 */
import React from 'react';
import App, { mapStateToProps, mapDispatchToProps } from './App';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { AppContext, user, logOut } from './AppContext';
import { fromJS } from 'immutable';
import { loginRequest, boundLogout } from '../actions/uiActionCreators';

// Mock Redux store
const mockStore = {
  getState: () => ({
    ui: fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: false,
    }),
  }),
  dispatch: jest.fn(),
};

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('mapStateToProps', () => {
  it('should map state to props correctly', () => {
    const state = mockStore.getState();
    const expectedProps = {
      isLoggedIn: state.ui.get('isUserLoggedIn'),
      displayDrawer: state.ui.get('isNotificationDrawerVisible'),
    };

    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});

describe('mapDispatchToProps', () => {
  it('should map dispatch to props correctly', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);

    expect(props.displayNotificationDrawer).toBeInstanceOf(Function);
    expect(props.hideNotificationDrawer).toBeInstanceOf(Function);
    expect(props.loginRequest).toBeInstanceOf(Function);
    expect(props.boundLogout).toBeInstanceOf(Function);
  });
});

describe('rendering components', () => {
  it('renders App component without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('contains Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it('contains Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it('contains Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Footer />)).toBe(true);
  });

  it('checks CourseList is not rendered', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });
});

describe('when isLoggedIn is true', () => {
  it('checks Login is not rendered', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(Login)).toHaveLength(0);
  });

  it('checks CourseList is rendered', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(CourseList)).toHaveLength(1);
  });

  it("tests that the logIn function updates user's state correctly", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <App loginRequest={loginRequest} />
      </AppContext.Provider>
    );

    const myUser = {
      email: 'testy@gmail.com',
      password: 'testy',
      isLoggedIn: true,
    };

    const instance = wrapper.find(App).instance();
    instance.logIn(myUser.email, myUser.password);
    wrapper.update();

    expect(wrapper.find(App).state().user).toEqual(myUser);

    wrapper.unmount();
  });

  it("tests that the logOut function updates user's state correctly", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <App boundLogout={boundLogout} />
      </AppContext.Provider>
    );

    const instance = wrapper.find(App).instance();
    instance.logOut();
    wrapper.update();

    expect(wrapper.find(App).state().user).toEqual(user);

    wrapper.unmount();
  });
});

describe('markNotificationAsRead works as intended', () => {
  it('verify that markNotificationAsRead works as intended, deletes the notification with the passed id from the listNotifications array', () => {
    const context = {
      user: {
        ...user,
      },
      logOut: jest.fn(),
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, html: { __html: jest.fn() }, type: 'urgent' },
      ],
    };

    const wrapper = mount(
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>
    );

    const instance = wrapper.find(App).instance();
    instance.markNotificationAsRead(3);
    wrapper.update();

    expect(wrapper.find(App).state().listNotifications).toEqual([
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ]);

    expect(wrapper.find(App).state().listNotifications.length).toBe(2);

    wrapper.unmount();
  });
});
