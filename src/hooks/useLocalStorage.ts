import { useMMKVStorage } from "react-native-mmkv-storage";
import { ReminderConfig } from "src/context/ReminderContext/ReminderContext";
import MMKV from "src/utils/MMKV";

export type LocalStorage = {
  "reminder-config": Omit<ReminderConfig, "callAt"> & {
    callAt: string;
  };
};

const defaultValues: LocalStorage = {
  "reminder-config": {
    isEnabled: false,
    callAt: new Date().toUTCString(),
  },
};

const useLocalStorage = <K extends keyof LocalStorage>(key: K) => {
  const [value, setValue] = useMMKVStorage<LocalStorage[K]>(
    key,
    MMKV,
    defaultValues[key] ?? undefined,
  );

  return [value, setValue] as const;
};

export default useLocalStorage;
