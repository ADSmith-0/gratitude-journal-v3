export type MonthYear = `${string}/${string}`;
export type DateString = `${string}/${string}/${string}`;

export type Entries = {
  [monthYear: MonthYear]: { [date: number]: string };
};

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
