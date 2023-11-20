import { ReactNode, useState } from "react";
import { DateContext } from ".";
import DateFormatter from "../../utils/DateFormatter";

type Props = {
  children: ReactNode;
};

const DateContextProvider = ({ children }: Props) => {
  const [date, setDate] = useState<string>(
    new DateFormatter().toReadableDate(),
  );

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateContextProvider;
