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
  unreadNotifications, // Use the selector instead of listNotifications
  handleDisplayDrawer,
  handleHideDrawer,
  markAsRead, // Use the action creator directly
  fetchNotifications,
  setNotificationFilter,
}) => {
  useEffect(() => {
    // Call fetchNotifications action when component mounts
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
            style={{
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
            }}
            aria-label="Close"
            onClick={handleHideDrawer}
          >
            <img src={closeIcon} alt="close icon" width="10px" />
          </button>
          {unreadNotifications.length !== 0 ? (
            <p>Here is the list of notifications</p>
          ) : null}
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
          <ul>
            {unreadNotifications.length === 0 ? (
              <NotificationItem
                type="default"
                value="No new notification for now"
              />
            ) : null}
            {unreadNotifications.map((val) => (
              <NotificationItem
                key={val.id}
                type={val.type}
                value={val.value}
                html={val.html}
                markAsRead={() => markAsRead(val.id)} // Use markAsRead action creator
                id={val.id}
              />
            ))}
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
  filterButton: {
    margin: "0 5px",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.5em",
  },
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  unreadNotifications: PropTypes.arrayOf(NotificationItemShape), // Use unreadNotifications instead of listNotifications
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markAsRead: PropTypes.func.isRequired, // Ensure markAsRead is required
  fetchNotifications: PropTypes.func.isRequired,
  setNotificationFilter: PropTypes.func.isRequired, // Ensure setNotificationFilter is required
};

Notifications.defaultProps = {
  displayDrawer: false,
  unreadNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

// Map state to props using the selector
const mapStateToProps = (state) => ({
  unreadNotifications: getUnreadNotificationsByType(state), // Use selector to get unreadNotifications
});

// Map dispatch to props
const mapDispatchToProps = {
  fetchNotifications,
  markAsRead,
  setNotificationFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
