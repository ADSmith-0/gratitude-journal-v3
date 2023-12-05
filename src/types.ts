export type Entries = { [date: string]: string };

export type DateString = `${number}/${number}/${number}`;

export enum RelativeDate {
  PAST = 1,
  TODAY = 2,
  FUTURE = 3,
}

export type calendarDate = {
  date: string;
  relativeToToday?: RelativeDate;
  hasEntry: boolean;
};
