import { useContext, useEffect, useState } from "react";
import { DateContext } from "../context/DateContext/DateContext";
import { calendarDate, DateRelativeToToday } from "../types";
import DateProcessor from "../utils/DateProcessor";

const useCalendarDates = () => {
  const { date } = useContext(DateContext);
  const dateProcessor = new DateProcessor(date);

  const [calendarDates, setCalendarDates] = useState<calendarDate[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: the rule is garbage
  useEffect(() => {
    const calendar: calendarDate[] = [];

    dateProcessor.date.setDate(1);
    const firstDay = dateProcessor.date.getDay();

    let startBuffer = 1;
    while (startBuffer < firstDay) {
      calendar.push({
        date: " ",
        relativeToToday: DateRelativeToToday.OUT_OF_BOUNDS,
        hasEntry: false,
      });
      startBuffer++;
    }

    const monthLength = dateProcessor.getMonthLength();
    const today = new Date().valueOf();

    while (dateProcessor.date.getDate() < monthLength) {
      calendar.push({
        date: dateProcessor.date.getDate().toString(),
        relativeToToday:
          dateProcessor.date.valueOf() < today
            ? DateRelativeToToday.BEFORE_TODAY
            : DateRelativeToToday.OUT_OF_BOUNDS,
        hasEntry: false,
      });
      dateProcessor.nextDay();
    }

    while (calendar.length !== 35 && calendar.length !== 42) {
      calendar.push({
        date: " ",
        relativeToToday: DateRelativeToToday.OUT_OF_BOUNDS,
        hasEntry: false,
      });
    }

    setCalendarDates(calendar);
  }, [dateProcessor.date.getMonth()]);

  return calendarDates;
};

export default useCalendarDates;
