import { createContext, Dispatch } from "react";
import DateProcessor from "src/utils/DateProcessor";

export type ReminderConfig = {
  isEnabled: boolean;
  callAt: DateProcessor;
};

export type ReminderUpdateOptions =
  | {
      action: "enable";
    }
  | {
      action: "disable";
    }
  | {
      action: "updateCallAt";
      newCallAt: ReminderConfig["callAt"];
    };

export const ReminderContext = createContext<{
  reminderConfig: ReminderConfig;
  dispatchUpdateReminderConfig: Dispatch<ReminderUpdateOptions>;
}>({
  reminderConfig: {
    isEnabled: false,
    callAt: new DateProcessor(),
  },
  dispatchUpdateReminderConfig: () => {},
});
