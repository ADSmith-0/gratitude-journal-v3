import { CalendarDays } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { colours, fontSize, styles } from "../styles";
import DateFormatter from "../utils/DateFormatter";
const { flex_column, ph_10, pl_3 } = styles;

const AddScreen = () => {
  const [date, setDate] = useState<string>(
    new DateFormatter().toReadableDate(),
  );

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
        style={[pl_3]}
      />
      <Button title="Submit" onPress={() => console.log("working")} />
    </SafeAreaView>
  );
};

export default AddScreen;
