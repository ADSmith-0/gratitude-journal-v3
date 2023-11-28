import { useContext, useEffect, useState } from "react";
import { DateContext } from "../context/DateContext/DateContext";
import DateProcessor from "../utils/DateProcessor";
import { matrix } from "../utils/utils";

const useCalendarDates = () => {
  const { date } = useContext(DateContext);
  const dateProcessor = new DateProcessor(date);

  const [calendarDates, setCalendarDates] = useState<string[][]>([[], []]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: the rule is garbage
  useEffect(() => {
    const calendar: string[][] = matrix(7, 7, "0");
    calendar[0] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let i = 1;
    let j = 0;

    dateProcessor.nextMonth();
    dateProcessor.date.setDate(0);
    const daysInMonth = dateProcessor.date.getDate();

    dateProcessor.date.setDate(1);

    while (j < dateProcessor.date.getDay()) {
      j++;
    }

    const bufferDays = j;

    while (i * 7 + j - bufferDays - 7 < daysInMonth) {
      calendar[i][j] = dateProcessor.date.getDate().toString();
      dateProcessor.nextDay();
      j++;
      if (j % 7 === 0) {
        i++;
        j = 0;
      }
    }

    setCalendarDates(calendar);
  }, [dateProcessor.date.getMonth()]);

  return calendarDates;
};

export default useCalendarDates;
