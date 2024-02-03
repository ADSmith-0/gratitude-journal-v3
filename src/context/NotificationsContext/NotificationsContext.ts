import { Dispatch, createContext } from "react";

export type Notifications = {
  isEnabled: boolean;
  time: string | undefined;
};

export type Options =
  | { action: "setTime"; time: string }
  | { action: "enable" | "disable" };

// TODO: Maybe change time to `${number}:${number}`?
export type INotificationsContext = {
  notifications: Notifications;
  dispatch: Dispatch<Options>;
};

export const NotificationsContext = createContext<INotificationsContext>({
  notifications: {
    isEnabled: false,
    time: new Date().toLocaleTimeString(),
  },
  dispatch: () => {},
});
