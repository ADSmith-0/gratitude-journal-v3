import { Dispatch, createContext } from "react";
import DateProcessor from "../../utils/DateProcessor";
import { Action } from "./DateContextProvider";

type IDateContext = {
  date: number;
  dispatch: Dispatch<Action>;
};

export const DateContext = createContext<IDateContext>({
  date: new DateProcessor().getValue(),
  dispatch: () => {},
});
