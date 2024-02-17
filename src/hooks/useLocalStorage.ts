import { useEffect } from "react";
import { useMMKVStorage } from "react-native-mmkv-storage";
import DateProcessor from "src/utils/DateProcessor";
import MMKV from "src/utils/MMKV";
import { removeReminder, setReminder } from "src/utils/Reminder";

export type LocalStorage = {
  "reminder-config": {
    isEnabled: boolean;
    time: Date;
  };
};

const useLocalStorage = <K extends keyof LocalStorage>(
  key: K,
  defaultValue?: LocalStorage[K],
) => {
  const [value, setValue] = useMMKVStorage<LocalStorage[K]>(
    key,
    MMKV,
    defaultValue,
  );


  return [value, setValue] as const;
};

export default useLocalStorage;
