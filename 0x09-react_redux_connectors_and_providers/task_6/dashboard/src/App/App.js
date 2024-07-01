import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import CourseList from "../CourseList/CourseList";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { getLatestNotification } from "../utils/utils";
import { AppContext, user as initialUser } from "./AppContext";
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, boundLogout } from '../actions/uiActionCreators';

export const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.get('isUserLoggedIn'), // Updated to access isUserLoggedIn from state.ui
  displayDrawer: state.ui.get('isNotificationDrawerVisible'), // Updated to access isNotificationDrawerVisible from state.ui
});

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  boundLogout,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: initialUser,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  listCourses = [
    { id: 1, name: "ES6", credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
    { id: 3, name: "React", credit: 40 },
  ];

  handleKeyPress(e) {
    if (e.ctrlKey && e.key === "h") {
      e.preventDefault();
      alert("Logging you out");
      this.props.boundLogout(); // Dispatching boundLogout action
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const { isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, loginRequest, boundLogout } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          logout: boundLogout,
        }}
      >
        <React.Fragment>
          <div className={css(styles.App)}>
            <div className="heading-section">
              <Header />
            </div>
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={this.listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={loginRequest} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the school">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis at tempora odio, necessitatibus repudiandae reiciendis cum nemo sed asperiores ut molestiae eaque aliquam illo
                ipsa iste vero dolor voluptates.
              </p>
            </BodySection>
            <Footer />
          </div>
        </React.Fragment>
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  App: {
    height: "100vh",
    maxWidth: "100vw",
    position: "relative",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
});

App.defaultProps = {
  isLoggedIn: false,
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
  displayNotificationDrawer: PropTypes.func.isRequired,
  hideNotificationDrawer: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  boundLogout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
