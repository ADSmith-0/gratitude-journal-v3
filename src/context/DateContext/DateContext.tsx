import { Dispatch, createContext } from "react";
import DateProcessor from "src/utils/DateProcessor";
import { Options } from "src/context/DateContext/DateContextProvider";

type IDateContext = {
  date: number;
  dispatch: Dispatch<Options>;
};

export const DateContext = createContext<IDateContext>({
  date: new DateProcessor().getValue(),
  dispatch: () => {},
});
