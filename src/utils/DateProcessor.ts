import { DateString } from "../types";

class DateProcessor {
  public date;

  constructor(date?: DateString) {
    if (date) {
      const [day, month, year]: number[] = date.split(
        "/",
      ) as unknown as number[];
      this.date = new Date(year, month - 1, day);
    } else {
      this.date = new Date();
    }
  }

  nextDay() {
    this.date.setDate(this.date.getDate() + 1);
    return this;
  }

  prevDay() {
    this.date.setDate(this.date.getDate() - 1);
    return this;
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    return this;
  }

  prevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    return this;
  }

  setLastDateOfMonth() {
    this.nextMonth();
    this.date.setDate(0);
    return this;
  }

  getLongDay() {
    return this.date.toLocaleDateString("en-GB", { weekday: "long" });
  }

  getLongMonth() {
    return this.date.toLocaleDateString("en-GB", { month: "long" });
  }

  toReadableDate(): DateString {
    return new Intl.DateTimeFormat("en-GB").format(this.date) as DateString;
  }
}

export default DateProcessor;
