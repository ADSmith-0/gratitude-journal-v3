import { Dispatch, createContext } from "react";

type INotificationsEnabledContext = {
  notificationsEnabled: boolean;
  setNotificationsEnabled: Dispatch<boolean>;
};

export const NotificationsEnabledContext =
  createContext<INotificationsEnabledContext>({
    notificationsEnabled: false,
    setNotificationsEnabled: () => {},
  });
