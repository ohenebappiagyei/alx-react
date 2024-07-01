import React, { useEffect } from "react";
import { connect } from "react-redux";
import Notifications from "./Notifications";
import { fetchNotifications } from "../actions/notificationActionCreators";
import { getUnreadNotifications } from "../selectors/notificationSelectors";

const NotificationsContainer = ({
  fetchNotifications,
  unreadNotifications,
  ...restProps
}) => {
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return <Notifications unreadNotifications={unreadNotifications} {...restProps} />;
};

const mapStateToProps = (state) => ({
  unreadNotifications: getUnreadNotifications(state),
});

const mapDispatchToProps = {
  fetchNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
