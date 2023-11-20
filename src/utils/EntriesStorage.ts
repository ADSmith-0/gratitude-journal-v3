import { Entries } from "../types";
import MMKV from "./MMKV";

const EntriesStorage = {
  entriesKey: "entries",

  set(key: string, value: string) {
    MMKV.getMap(this.entriesKey, (error, entries: Entries) => {
      if (error) {
        console.error(error);
        return;
      }

      entries[key] = value;

      MMKV.setMap(this.entriesKey, entries);
    });
  },

  get(key: string): string | undefined {
    const entries: Entries = MMKV.getMap<Entries>(this.entriesKey);

    if (entries?.[key]) {
      return entries[key];
    }

    return undefined;
  },

  getAll(): Entries {
    return MMKV.getMap(this.entriesKey, (error, entries: Entries) => {
      if (error) {
        console.error(error);
        return;
      }

      return entries;
    });
  },

  remove(key: string) {
    MMKV.getMap(this.entriesKey, (error, entries: Entries) => {
      if (error) {
        console.error(error);
        return;
      }

      delete entries[key];

      MMKV.setMap(this.entriesKey, entries);
    });
  },
};

export default EntriesStorage;
