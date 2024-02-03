import { ReactNode, useReducer } from "react";
import { Reminder, ReminderContext, Options } from "./ReminderContext";

type Props = {
  children: ReactNode;
};

const ReminderContextProvider = ({ children }: Props) => {
  const reducer = (reminder: Reminder, options: Options): Reminder => {
    const newReminder = structuredClone(reminder);
    const { action } = options;

    switch (action) {
      case "setTime": {
        newReminder.time = options.time;
        break;
      }
      case "enable": {
        newReminder.isEnabled = true;
        break;
      }
      case "disable": {
        newReminder.isEnabled = false;
        break;
      }
    }

    return reminder;
  };

  const [reminder, dispatch] = useReducer(reducer, {
    isEnabled: false,
    time: undefined,
  });

  return (
    <ReminderContext.Provider value={{ reminder, dispatch }}>
      {children}
    </ReminderContext.Provider>
  );
};

export default ReminderContextProvider;
