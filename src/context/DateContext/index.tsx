import { createContext, Dispatch, SetStateAction } from "react";

type IDateContext = {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};

export const DateContext = createContext<IDateContext>({
  date: "",
  setDate: () => {},
});
