import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DaySelector from "src/components/Entry/DaySelector";
import Input from "src/components/UI/Input";
import { DateContext } from "src/context/DateContext/DateContext";
import { colours, styles } from "src/styles";
import EntriesStorage from "src/utils/EntriesStorage";
const { flex_column, ph_1, pl_8, pt_6, br_0, border_0, bg_offWhite } = styles;

const AddScreen = () => {
  const { date } = useContext(DateContext);

  const [entry, setEntry] = useState<string>();

  useEffect(() => {
    setEntry(EntriesStorage.get(date));
  }, [date]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: bad rule
  useEffect(() => {
    const timeout = setTimeout(
      () => EntriesStorage.set(date, entry as string),
      500,
    );
    return () => clearTimeout(timeout);
  }, [entry]);

  return (
    <SafeAreaView style={[flex_column, ph_1]}>
      <DaySelector />
      <Input
        editable
        multiline
        numberOfLines={23}
        textAlignVertical="top"
        placeholder="I'm grateful for..."
        placeholderTextColor={colours.grey[600]}
        style={[pl_8, pt_6, br_0, border_0, bg_offWhite]}
        value={entry}
        onChangeText={text => setEntry(text)}
      />
    </SafeAreaView>
  );
};

export default AddScreen;
