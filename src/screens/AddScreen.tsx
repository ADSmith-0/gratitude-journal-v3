import { useContext, useEffect, useState } from "react";
import DaySelector from "src/components/Entry/DaySelector";
import ContentWrapper from "src/components/Screen/ContentWrapper";
import Input from "src/components/UI/Input";
import { DateContext } from "src/context/DateContext/DateContext";
import { colours, styles } from "src/styles";
import EntriesStorage from "src/utils/EntriesStorage";
const { flex_column, ph_1, ph_5, pt_8, br_0, border_0, bg_offWhite } = styles;

const AddScreen = () => {
  const { date } = useContext(DateContext);

  const [entry, setEntry] = useState<string>("");

  useEffect(() => {
    setEntry(EntriesStorage.get(date) ?? "");
  }, [date]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: bad rule
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (entry) {
        EntriesStorage.set(date, entry as string);
      } else {
        EntriesStorage.remove(date);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [entry]);

  return (
    <ContentWrapper style={[flex_column, ph_1]}>
      <DaySelector />
      <Input
        editable
        multiline
        numberOfLines={23}
        textAlignVertical="top"
        placeholder="I'm grateful for..."
        placeholderTextColor={colours.grey[600]}
        containerStyle={[ph_5, pt_8]}
        style={[br_0, border_0, bg_offWhite]}
        value={entry}
        onChangeText={text => setEntry(text)}
      />
    </ContentWrapper>
  );
};

export default AddScreen;
