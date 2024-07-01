import React, { useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../assets/close-icon.png";
import { connect } from "react-redux";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import {
  fetchNotifications,
  markAsRead,
  setNotificationFilter,
} from "../actions/notificationActionCreators";
import { getUnreadNotificationsByType } from "../selectors/notificationSelectors"; // Import the selector

const Notifications = ({
  displayDrawer,
  unreadNotifications,
  handleDisplayDrawer,
  handleHideDrawer,
  markAsRead,
  fetchNotifications,
  setNotificationFilter,
}) => {
  useEffect(() => {
    // Fetch notifications on component mount
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <React.Fragment>
      {!displayDrawer ? (
        <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
          <p>Your notifications</p>
        </div>
      ) : (
        <div className={css(styles.Notifications)}>
          <button
            className={css(styles.closeButton)}
            aria-label="Close"
            onClick={handleHideDrawer}
          >
            <img src={closeIcon} alt="close icon" width="10px" />
          </button>
          {unreadNotifications.length > 0 && (
            <p>Here is the list of notifications</p>
          )}
          <div className={css(styles.filterButtons)}>
            <button
              onClick={() => setNotificationFilter("URGENT")}
              className={css(styles.filterButton)}
            >
              ‼️
            </button>
            <button
              onClick={() => setNotificationFilter("DEFAULT")}
              className={css(styles.filterButton)}
            >
              💠
            </button>
          </div>
          <ul className={css(styles.notificationList)}>
            {unreadNotifications.length === 0 ? (
              <NotificationItem
                type="default"
                value="No new notifications for now"
              />
            ) : (
              unreadNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={() => markAsRead(notification.id)}
                  id={notification.id}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

const opacityAnim = {
  "0%": { opacity: 0.5 },
  "100%": { opacity: 1 },
};

const bounceAnim = {
  "0%": { transform: "translateY(0px)" },
  "33%": { transform: "translateY(-5px)" },
  "66%": { transform: "translateY(5px)" },
  "100%": { transform: "translateY(0px)" },
};

const styles = StyleSheet.create({
  Notifications: {
    padding: "1em",
    border: "2px dashed red",
    position: "absolute",
    top: "1.8em",
    right: "0",
    zIndex: "100",
    "@media (max-width: 900px)": {
      width: "100%",
      padding: "0px",
      fontSize: 20,
      position: "relative",
      right: 0,
      left: 0,
      border: "none",
    },
  },
  menuItem: {
    position: "relative",
    zIndex: 100,
    textAlign: "right",
    ":hover": {
      cursor: "pointer",
      animationName: [opacityAnim, bounceAnim],
      animationDuration: "1s, 0.5s",
      animationIterationCount: "3",
    },
  },
  closeButton: {
    color: "#3a3a3a",
    fontWeight: "bold",
    background: "none",
    border: "none",
    fontSize: "15px",
    position: "absolute",
    right: "3px",
    top: "3px",
    cursor: "pointer",
    outline: "none",
  },
  filterButtons: {
    marginTop: "10px",
    textAlign: "center",
  },
  filterButton: {
    margin: "0 5px",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.5em",
  },
  notificationList: {
    listStyleType: "none",
    padding: 0,
  },
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  unreadNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markAsRead: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  setNotificationFilter: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  displayDrawer: false,
  unreadNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

// Map state to props using the selector
const mapStateToProps = (state) => ({
  unreadNotifications: getUnreadNotificationsByType(state),
});

// Map dispatch to props
const mapDispatchToProps = {
  fetchNotifications,
  markAsRead,
  setNotificationFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
