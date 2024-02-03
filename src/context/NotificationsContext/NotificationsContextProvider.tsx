import { ReactNode, useReducer } from "react";
import {
  Notifications,
  NotificationsContext,
  Options,
} from "./NotificationsContext";

type Props = {
  children: ReactNode;
};

const NotificationsContextProvider = ({ children }: Props) => {
  const reducer = (
    notifications: Notifications,
    options: Options,
  ): Notifications => {
    const newNotifications = structuredClone(notifications);
    const { action } = options;

    switch (action) {
      case "setTime": {
        newNotifications.time = options.time;
        break;
      }
      case "enable": {
        newNotifications.isEnabled = true;
        break;
      }
      case "disable": {
        newNotifications.isEnabled = false;
        break;
      }
    }

    return notifications;
  };

  const [notifications, dispatch] = useReducer(reducer, {
    isEnabled: false,
    time: undefined,
  });

  return (
    <NotificationsContext.Provider value={{ notifications, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
