import { MMKVLoader } from "react-native-mmkv-storage";
import { Entries } from "src/types";
import DateProcessor from "src/utils/DateProcessor";

const MMKV = new MMKVLoader()
  .withEncryption()
  .withInstanceID("entries")
  .initialize();

const entriesKey = "entries";

const EntriesStorage = {
  set: (epoch: number, value: string) => {
    const entries: Entries = MMKV.getMap<Entries>(entriesKey) ?? {};

    const dateProcessor = new DateProcessor(epoch);
    const monthYear = dateProcessor.getMonthYear();
    const currentDate = dateProcessor.date.getDate();

    if (!entries[monthYear]) {
      entries[monthYear] = {};
    }

    entries[monthYear][currentDate] = value;

    MMKV.setMap(entriesKey, entries);
  },

  get: (epoch: number): string | undefined => {
    const entries: Entries = MMKV.getMap<Entries>(entriesKey);

    const dateProcessor = new DateProcessor(epoch);
    const monthYear = dateProcessor.getMonthYear();
    const currentDate = dateProcessor.date.getDate();

    if (entries?.[monthYear]) {
      return entries[monthYear][currentDate];
    }

    return undefined;
  },

  getMonth: (epoch: number): Record<string, string> | undefined => {
    const entries: Entries = MMKV.getMap<Entries>(entriesKey);
    const dateProcessor = new DateProcessor(epoch);
    const monthYear = dateProcessor.getMonthYear();

    if (entries?.[monthYear]) {
      return entries[monthYear];
    }

    return undefined;
  },

  getAll: (): Entries => MMKV.getMap(entriesKey),

  remove: (epoch: number) => {
    const entries: Entries = MMKV.getMap<Entries>(entriesKey);
    const dateProcessor = new DateProcessor(epoch);
    if (entries?.[dateProcessor.getMonthYear()]) {
      delete entries[dateProcessor.getMonthYear()][
        dateProcessor.date.getDate()
      ];
    }

    return MMKV.setMap(entriesKey, entries ?? {});
  },
};

export default EntriesStorage;
