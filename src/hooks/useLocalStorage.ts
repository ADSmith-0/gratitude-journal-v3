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

MMKV.transactions.register("object", "beforewrite", (key, value) => {
  if (key === "reminder-config") {
    const currentConfig: LocalStorage["reminder-config"] =
      MMKV.getMap("reminder-config");
    const val = value as LocalStorage["reminder-config"];

    if (
      val.time.getHours() === new Date(currentConfig.time).getHours() &&
      val.time.getMinutes() === new Date(currentConfig.time).getMinutes() &&
      val.isEnabled === currentConfig.isEnabled
    ) {
      return;
    }

    if (val.isEnabled) {
      const dateProcessor = new DateProcessor(val.time.valueOf());
      setReminder(dateProcessor);
    } else {
      removeReminder();
    }
  }
});

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
