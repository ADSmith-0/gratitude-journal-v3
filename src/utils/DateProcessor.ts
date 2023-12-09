import { DateString, MonthYear } from "../types";

class DateProcessor {
  public date;

  constructor(date?: number) {
    if (date) {
      this.date = new Date(date);
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

  getValue() {
    return this.date.valueOf();
  }

  getMonthYear(): MonthYear {
    return `${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
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
