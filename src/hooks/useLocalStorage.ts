
const useLocalStorage = (key: string, defaultValue: unknown) => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);
  return [value, setValue];
};

export default useLocalStorage;
