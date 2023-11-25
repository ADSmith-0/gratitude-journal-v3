import { CalendarDays } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { DateContext } from "../context/DateContext/DateContext";
import { colours, fontSize, styles } from "../styles";
import EntriesStorage from "../utils/EntriesStorage";
const { flex_column, mt_10, ph_10, pl_3 } = styles;

const AddScreen = () => {
  const { date } = useContext(DateContext);

  const [defaultEntry, setDefaultEntry] = useState<string>();
  const [entry, setEntry] = useState<string>();

  useEffect(() => {
    setDefaultEntry(EntriesStorage.get(date));
  }, [date]);

  const calendarOnTouch = () => {
    // TODO calendar input onClick
    console.log("hello");
  };

  return (
    <SafeAreaView style={[flex_column, ph_10]}>
      <Input
        label="Selected Date"
        icon={<CalendarDays color={colours.grey[100]} size={fontSize.l} />}
        editable={false}
        value={date}
        onTouchStart={calendarOnTouch}
      />
      <Input
        label="Entry"
        editable
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        placeholder="Today I'm grateful for..."
        placeholderTextColor={colours.grey[700]}
        style={pl_3}
        defaultValue={defaultEntry}
        value={entry}
        onChangeText={text => setEntry(text)}
      />
      <Button
        title="Submit"
        disabled={defaultEntry === entry || entry === ""} // TODO change to error instead of disable
        onPress={() => EntriesStorage.set(date, entry as string)}
        buttonStyle={mt_10}
      />
    </SafeAreaView>
  );
};

export default AddScreen;
