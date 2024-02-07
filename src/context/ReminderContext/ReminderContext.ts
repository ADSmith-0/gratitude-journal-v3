import { Dispatch, createContext } from "react";
import DateProcessor from "src/utils/DateProcessor";

export type Reminder = {
  isEnabled: boolean;
  time: DateProcessor;
};

export type Options =
  | { action: "setTime"; time: DateProcessor }
  | { action: "enable" | "disable" };

// TODO: Maybe change time to `${number}:${number}`?
export type IReminderContext = {
  reminder: Reminder;
  dispatch: Dispatch<Options>;
};

export const ReminderContext = createContext<IReminderContext>({
  reminder: {
    isEnabled: false,
    time: new DateProcessor(),
  },
  dispatch: () => {},
});
