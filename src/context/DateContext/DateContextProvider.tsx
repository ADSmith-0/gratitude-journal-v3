import { ReactNode, useReducer } from "react";
import { DateContext } from "./DateContext";
import DateProcessor from "../../utils/DateProcessor";

type Props = {
  children: ReactNode;
};

export type Action = "nextDay" | "prevDay" | "nextMonth" | "prevMonth";

const DateContextProvider = ({ children }: Props) => {
  const reducer = (currentDate: number, action: Action): number => {
    const date = new DateProcessor(currentDate);

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

    return date.getValue();
  };

  const [date, dispatch] = useReducer(reducer, new DateProcessor().getValue());

  return (
    <DateContext.Provider value={{ date, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateContextProvider;
