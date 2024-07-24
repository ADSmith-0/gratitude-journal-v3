import { ReactNode, useEffect, useReducer } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { removeReminder, setReminder } from "src/utils/Reminder";
import {
  ReminderConfig,
  ReminderContext,
  ReminderUpdateOptions,
} from "./ReminderContext";

const reducer = (
  currentConfig: ReminderConfig,
  options: ReminderUpdateOptions,
): ReminderConfig => {
  const { action } = options;
  switch (action) {
    case "enable": {
      setReminder(currentConfig.callAt);
      return {
        ...currentConfig,
        isEnabled: true,
      };
    }
    case "disable": {
      removeReminder();
      return {
        ...currentConfig,
        isEnabled: false,
      };
    }
    case "updateCallAt": {
      const { newCallAt } = options;
      setReminder(currentConfig.callAt);
      return {
        ...currentConfig,
        callAt: newCallAt,
      };
    }
    default: {
      return currentConfig;
    }
  }
};

type Props = {
  children: ReactNode;
};

// FIX: Saving to local storage converts the Date object into a string, need to change it back to an object
export const ReminderContextProvider = ({ children }: Props) => {
  const [storedReminderConfig, setStoredReminderConfig] =
    useLocalStorage("reminder-config");
  const [reminderConfig, dispatchUpdateReminderConfig] = useReducer(
    reducer,
    storedReminderConfig,
  );

  useEffect(() => {
    console.log("reminderConfig:", reminderConfig);
    setStoredReminderConfig(reminderConfig);
  }, [reminderConfig]);

  return (
    <ReminderContext.Provider
      value={{ reminderConfig, dispatchUpdateReminderConfig }}>
      {children}
    </ReminderContext.Provider>
  );
};
