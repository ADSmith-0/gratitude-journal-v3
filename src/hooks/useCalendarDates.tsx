import { useContext, useEffect, useRef, useState } from "react";
import { DateContext } from "../context/DateContext/DateContext";
import { DateTag, calendarDate } from "../types";
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
      dateTag: DateTag.INVALID,
      hasEntry: false,
    });
    startBuffer++;
  }

  const today = new Date().valueOf();
  const currentMonth = dateProcessor.date.getMonth();
  const monthEntries = EntriesStorageInstance.getMonth(
    dateProcessor.getValue(),
  );

  while (dateProcessor.date.getMonth() === currentMonth) {
    const currentDate = dateProcessor.date.getDate().toString();

    calendar.push({
      date: currentDate,
      dateTag:
        dateProcessor.date.valueOf() < today ? DateTag.VALID : DateTag.INVALID,
      hasEntry: !!monthEntries?.[currentDate] ?? false,
    });
    dateProcessor.nextDay();
  }

  while (calendar.length !== 35 && calendar.length !== 42) {
    calendar.push({
      date: " ",
      dateTag: DateTag.INVALID,
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
    const monthYear = dateProcessor.getMonthYear();

    if (currentMonth !== month.current) {
      if (cache.current.has(monthYear)) {
        setCalendarDates(cache.current.get(monthYear));
      } else {
        month.current = currentMonth;
        const calendarMonth: calendarDate[] = calculateMonth(dateProcessor);
        setCalendarDates(calendarMonth);
        if (cache.current.size < 10) {
          cache.current.set(monthYear, calendarMonth);
        }
      }
    }
  }, [date]);

  return calendarDates;
};

export default useCalendarDates;
