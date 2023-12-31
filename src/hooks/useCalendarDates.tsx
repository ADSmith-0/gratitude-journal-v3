import { useContext, useEffect, useRef, useState } from "react";
import { DateContext } from "src/context/DateContext/DateContext";
import { DateTag, calendarDate } from "src/types";
import DateProcessor from "src/utils/DateProcessor";
import EntriesStorageInstance from "src/utils/EntriesStorage";

const calculateMonth = (dateProcessor: DateProcessor): calendarDate[] => {
  const calendar: calendarDate[] = [];

  dateProcessor.date.setDate(1);

  // If the first day is Sunday (0) then set firstDay to 7 to generate the correct buffer count of 6
  const firstDay = dateProcessor.date.getDay() || 7;

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
        const calendarMonth: calendarDate[] = calculateMonth(dateProcessor);
        setCalendarDates(calendarMonth);
        if (cache.current.size < 10) {
          cache.current.set(monthYear, calendarMonth);
        }
      }
      month.current = currentMonth;
    }

    return () => {
      cache.current = new Map();
    };
  }, [date]);

  return calendarDates;
};

export default useCalendarDates;
