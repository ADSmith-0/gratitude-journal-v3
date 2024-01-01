import { ReactNode, useReducer } from "react";
import { DateContext } from "src/context/DateContext/DateContext";
import DateProcessor from "src/utils/DateProcessor";

type Props = {
  children: ReactNode;
};

export type Options =
  | { action: "setDate"; newDate: number }
  | { action: "nextDay" | "prevDay" | "nextMonth" | "prevMonth" };

const DateContextProvider = ({ children }: Props) => {
  const reducer = (currentDate: number, options: Options): number => {
    const date = new DateProcessor(currentDate);
    const { action } = options;

    switch (action) {
      case "setDate": {
        const { newDate } = options;
        const newDateProcessor = new DateProcessor(newDate);
        return newDateProcessor.getValue();
      }
      case "nextDay": {
        date.nextDay();
        break;
      }
      case "prevDay": {
        date.prevDay();
        break;
      }
      case "nextMonth": {
        date.nextMonth();
        break;
      }
      case "prevMonth": {
        date.prevMonth();
        break;
      }
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
