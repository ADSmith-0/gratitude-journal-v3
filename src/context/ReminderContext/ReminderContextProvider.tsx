import { ReactNode, useReducer } from "react";
import DateProcessor from "src/utils/DateProcessor";
import { removeReminder, setReminder } from "src/utils/Reminder";
import { Options, Reminder, ReminderContext } from "./ReminderContext";

type Props = {
  children: ReactNode;
};

const ReminderContextProvider = ({ children }: Props) => {
  const reducer = (reminder: Reminder, options: Options): Reminder => {
    const newReminder = { ...reminder };
    const { action } = options;

    switch (action) {
      case "setTime": {
        setReminder(options.time);
        newReminder.time = options.time;
        break;
      }
      case "enable": {
        setReminder(reminder.time);
        newReminder.isEnabled = true;
        break;
      }
      case "disable": {
        removeReminder();
        newReminder.isEnabled = false;
        break;
      }
    }

    return newReminder;
  };

  const nineAMReminder = new DateProcessor();
  nineAMReminder.date.setHours(9, 0, 0);

  const [reminder, dispatch] = useReducer(reducer, {
    isEnabled: false,
    time: nineAMReminder,
  });

  return (
    <ReminderContext.Provider value={{ reminder, dispatch }}>
      {children}
    </ReminderContext.Provider>
  );
};

export default ReminderContextProvider;
