import { useContext, useEffect, useState } from "react";
import { DateContext } from "../context/DateContext/DateContext";
import DateProcessor from "../utils/DateProcessor";

// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days = ["M", "T", "W", "T", "F", "S", "S"];
const dates = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

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

    while (calendar.length !== 42 && calendar.length !== 49) {
      if (calendar[currentLastIndex]) {
        calendar[currentLastIndex] = "0";
      } else {
        calendar.push("0");
      }
      currentLastIndex++;
    }

    setCalendarDates(calendar);
  }, [dateProcessor.date.getMonth()]);

  return calendarDates;
};

export default useCalendarDates;
