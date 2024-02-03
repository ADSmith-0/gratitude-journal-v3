import { Dispatch, createContext } from "react";
import DateProcessor from "src/utils/DateProcessor";

export type Options =
  | { action: "setDate"; newDate: number }
  | { action: "nextDay" | "prevDay" | "nextMonth" | "prevMonth" };

type IDateContext = {
  date: number;
  dispatch: Dispatch<Options>;
};

export const DateContext = createContext<IDateContext>({
  date: new DateProcessor().getValue(),
  dispatch: () => {},
});
