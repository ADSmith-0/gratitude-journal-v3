import { DateString, MonthYear } from "src/types";

class DateProcessor {
  public date: Date;

  constructor(epoch?: number) {
    if (epoch) {
      this.date = new Date(epoch);
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
    return this.date
      .toLocaleDateString("en-GB", { weekday: "long" })
      .split(",")[0];
  }

  getLongMonth() {
    return this.date.toLocaleDateString("en-GB", { month: "long" });
  }

  toReadableDate(): DateString {
    return new Intl.DateTimeFormat("en-GB").format(this.date) as DateString;
  }
}

export default DateProcessor;
