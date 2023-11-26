import { useContext, useEffect, useState } from "react";
import { DateContext } from "../context/DateContext/DateContext";
import DateProcessor from "../utils/DateProcessor";

const useDates = () => {
  const { date } = useContext(DateContext);
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const dateProcessor = new DateProcessor(date);

  const [dates, setDates] = useState<Int8Array>(new Int8Array(45));

  // biome-ignore lint/correctness/useExhaustiveDependencies: the rule is garbage
  useEffect(() => {
    const monthDates = new Int8Array(45);
    let index = 0;
    dateProcessor.date.setDate(1);
    while (index < dateProcessor.date.getDay()) {
      index++;
    }
    const bufferDays = index;
    while (index - bufferDays < daysInMonths[dateProcessor.date.getMonth()]) {
      monthDates[index] = dateProcessor.date.getDate();
      dateProcessor.nextDay();
      index++;
    }
    setDates(monthDates);
  }, [dateProcessor.date.getMonth()]);

  return Array.from(dates);
};

export default useDates;
