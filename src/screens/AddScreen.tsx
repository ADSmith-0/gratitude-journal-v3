import { CalendarDays } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { colours, fontSize, styles } from "../styles";
import DateFormatter from "../utils/DateFormatter";
import EntriesStorage from "../utils/EntriesStorage";
const { flex_column, ph_10, pl_3 } = styles;

const AddScreen = () => {
  const [date, setDate] = useState<string>(
    new DateFormatter().toReadableDate(),
  );

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
        disabled={defaultEntry === entry || entry === ""}
        onPress={() => EntriesStorage.set(date, entry as string)}
      />
    </SafeAreaView>
  );
};

export default AddScreen;
