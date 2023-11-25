import { Dispatch, createContext } from "react";
import { DateString } from "../../types";
import DateProcessor from "../../utils/DateProcessor";
import { Action } from "./DateContextProvider";

type IDateContext = {
  date: DateString;
  dispatch: Dispatch<Action>;
};

export const DateContext = createContext<IDateContext>({
  date: new DateProcessor().toReadableDate(),
  dispatch: () => {},
});
