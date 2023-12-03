import { useContext, useEffect, useState } from "react";
import { DateContext } from "../context/DateContext/DateContext";
import DateProcessor from "../utils/DateProcessor";
import { dates, days } from "../utils/global";

const useCalendarDates = () => {
  const { date } = useContext(DateContext);
  const dateProcessor = new DateProcessor(date);

  const [calendarDates, setCalendarDates] = useState<string[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: the rule is garbage
  useEffect(() => {
    let calendar: string[] = days.slice();
    dateProcessor.date.setDate(1);
    const firstDay = dateProcessor.date.getDay();

    dateProcessor.date.setDate(0);
    const daysInPrevMonth = dateProcessor.date.getDate();

    let buffer = 1;
    while (buffer < firstDay) {
      const dayDiff = firstDay - 1 - buffer;
      calendar.push((daysInPrevMonth - dayDiff).toString());
      buffer++;
    }

    if (dateProcessor.date.getDay() === 0) {
      calendar = calendar.concat(Array(6).fill("0"));
      buffer = 6;
    }

    calendar = calendar.concat(dates);

    dateProcessor.setLastDateOfMonth();
    const monthLength = dateProcessor.date.getDate();

    let currentLastIndex = 7 + buffer + monthLength - 1;
    let nextDay = 1;

    while (calendar.length !== 42 && calendar.length !== 49) {
      if (calendar[currentLastIndex]) {
        calendar[currentLastIndex] = nextDay.toString();
      } else {
        calendar.push(nextDay.toString());
      }
      nextDay++;
      currentLastIndex++;
    }

    setCalendarDates(calendar);
  }, [dateProcessor.date.getMonth()]);

  return calendarDates;
};

export default useCalendarDates;
