export type MonthYear = `${string}/${string}`;
export type DateString = `${string}/${string}/${string}`;

export type Entries = {
  [monthYear: MonthYear]: { [date: number]: string };
};

export enum DateTag {
  VALID = 1,
  TODAY = 2,
  INVALID = 3,
}

export type calendarDate = {
  date: string;
  dateTag: DateTag;
  hasEntry: boolean;
};
