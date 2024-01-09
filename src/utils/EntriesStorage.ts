import { Entries } from "src/types";
import DateProcessor from "src/utils/DateProcessor";
import MMKV from "src/utils/MMKV";

class EntriesStorage {
  private entriesKey = "entries";

  constructor() {
    MMKV.getMap(this.entriesKey, (error, entries: Entries) => {
      if (error) {
        console.error(error);
        return;
      }

      if (entries === null) {
        MMKV.setMap(this.entriesKey, {});
      }
    });
  }

  set(epoch: number, value: string) {
    MMKV.getMap(this.entriesKey, (error, entries: Entries) => {
      if (error) {
        console.error(error);
        return;
      }

      const dateProcessor = new DateProcessor(epoch);
      const monthYear = dateProcessor.getMonthYear();
      const currentDate = dateProcessor.date.getDate();

      if (!entries[monthYear]) {
        entries[monthYear] = {};
      }

      entries[monthYear][currentDate] = value;

      MMKV.setMap(this.entriesKey, entries);
    });
  }

  get(epoch: number): string | undefined {
    const entries: Entries = MMKV.getMap<Entries>(this.entriesKey);

    const dateProcessor = new DateProcessor(epoch);
    const monthYear = dateProcessor.getMonthYear();
    const currentDate = dateProcessor.date.getDate();

    if (entries?.[monthYear]) {
      return entries[monthYear][currentDate];
    }

    return undefined;
  }

  getMonth(epoch: number): Record<string, string> | undefined {
    const entries: Entries = MMKV.getMap<Entries>(this.entriesKey);
    const dateProcessor = new DateProcessor(epoch);
    const monthYear = dateProcessor.getMonthYear();

    if (entries?.[monthYear]) {
      return entries[monthYear];
    }

    return undefined;
  }

  getAll(): Entries {
    return MMKV.getMap(this.entriesKey, (error, entries: Entries) => {
      if (error) {
        console.error(error);
        return;
      }

      return entries;
    });
  }

  remove(date: number) {
    MMKV.getMap(this.entriesKey, (error, entries: Entries) => {
      if (error) {
        console.error(error);
        return;
      }

      const dateProcessor = new DateProcessor(date);
      delete entries[dateProcessor.getMonthYear()][
        dateProcessor.date.getDate()
      ];

      MMKV.setMap(this.entriesKey, entries);
    });
  }
}

const EntriesStorageInstance = new EntriesStorage();

export default EntriesStorageInstance;
