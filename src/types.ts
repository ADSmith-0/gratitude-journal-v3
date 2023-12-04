export type Entries = { [date: string]: string };

export type DateString = `${number}/${number}/${number}`;

export enum DateRelativeToToday {
  OUT_OF_BOUNDS = 1,
  BEFORE_TODAY = 2,
  TODAY = 3,
}

export type calendarDate = {
  date: string;
  relativeToToday?: DateRelativeToToday;
  hasEntry: boolean;
};
