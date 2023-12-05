import { useContext, useEffect, useRef, useState } from "react";
import { DateContext } from "../context/DateContext/DateContext";
import { calendarDate, DateRelativeToToday } from "../types";
import DateProcessor from "../utils/DateProcessor";
import EntriesStorageInstance from "../utils/EntriesStorage";

const calculateMonth = (dateProcessor: DateProcessor): calendarDate[] => {
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

  const today = new Date().valueOf();
  const currentMonth = dateProcessor.date.getMonth();

  while (dateProcessor.date.getMonth() === currentMonth) {
    calendar.push({
      date: dateProcessor.date.getDate().toString(),
      relativeToToday:
        dateProcessor.date.valueOf() < today
          ? DateRelativeToToday.BEFORE_TODAY
          : DateRelativeToToday.OUT_OF_BOUNDS,
      hasEntry: !!EntriesStorageInstance.get(dateProcessor.toReadableDate()),
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

  return calendar;
};

const useCalendarDates = () => {
  const { date } = useContext(DateContext);
  const [calendarDates, setCalendarDates] = useState<calendarDate[]>([]);
  const month = useRef<number>();
  const cache = useRef(new Map());

  useEffect(() => {
    const dateProcessor = new DateProcessor(date);
    const currentMonth = dateProcessor.date.getMonth();

    if (currentMonth !== month.current) {
      if (cache.current.has(currentMonth)) {
        setCalendarDates(cache.current.get(currentMonth));
      } else {
        month.current = currentMonth;
        const calendarMonth: calendarDate[] = calculateMonth(dateProcessor);
        setCalendarDates(calendarMonth);
        if (cache.current.size < 10) {
          cache.current.set(currentMonth, calendarMonth);
        }
      }
    }
  }, [date]);

  return calendarDates;
};

export default useCalendarDates;
