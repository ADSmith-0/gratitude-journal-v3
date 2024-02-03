import { Dispatch, createContext } from "react";

export type Reminder = {
  isEnabled: boolean;
  time: string | undefined;
};

export type Options =
  | { action: "setTime"; time: string }
  | { action: "enable" | "disable" };

// TODO: Maybe change time to `${number}:${number}`?
export type IReminderContext = {
  reminder: Reminder;
  dispatch: Dispatch<Options>;
};

export const ReminderContext = createContext<IReminderContext>({
  reminder: {
    isEnabled: false,
    time: new Date().toLocaleTimeString(),
  },
  dispatch: () => {},
});
