import { ReactNode, useReducer } from "react";
import { DateContext } from "./DateContext";
import { DateString } from "../../types";
import DateProcessor from "../../utils/DateProcessor";

type Props = {
  children: ReactNode;
};

export type Action = "nextDay" | "prevDay" | "nextMonth" | "prevMonth";

const DateContextProvider = ({ children }: Props) => {
  const reducer = (state: DateString, action: Action): DateString => {
    const date = new DateProcessor(state);

    switch (action) {
      case "nextDay":
        date.nextDay();
        break;
      case "prevDay":
        date.prevDay();
        break;
      case "nextMonth":
        date.nextMonth();
        break;
      case "prevMonth":
        date.prevMonth();
        break;
    }

    return date.toReadableDate();
  };

  const [date, dispatch] = useReducer(
    reducer,
    new DateProcessor().toReadableDate(),
  );

  return (
    <DateContext.Provider value={{ date, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateContextProvider;
