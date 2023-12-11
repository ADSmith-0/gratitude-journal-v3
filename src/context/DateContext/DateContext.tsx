import { Dispatch, createContext } from "react";
import DateProcessor from "src/utils/DateProcessor";
import { Action } from "src/context/DateContext/DateContextProvider";

type IDateContext = {
  date: number;
  dispatch: Dispatch<Action>;
};

export const DateContext = createContext<IDateContext>({
  date: new DateProcessor().getValue(),
  dispatch: () => {},
});
