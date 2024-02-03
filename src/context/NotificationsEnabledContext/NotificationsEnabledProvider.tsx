import { ReactNode, useState } from "react";
import { NotificationsEnabledContext } from "./NotificationsEnabled";

type Props = {
  children: ReactNode;
};

const NotificationsEnabledContextProvider = ({ children }: Props) => {
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false);

  return (
    <NotificationsEnabledContext.Provider
      value={{ notificationsEnabled, setNotificationsEnabled }}>
      {children}
    </NotificationsEnabledContext.Provider>
  );
};

export default NotificationsEnabledContextProvider;
