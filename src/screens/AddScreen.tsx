// import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DaySelector from "src/components/Entry/DaySelector";
import Button from "src/components/UI/Button";
import Input from "src/components/UI/Input";
import { DateContext } from "src/context/DateContext/DateContext";
import { colours, styles } from "src/styles";
import DateProcessor from "src/utils/DateProcessor";
import EntriesStorage from "src/utils/EntriesStorage";
const { flex_column, mt_10, ph_1, pl_3 } = styles;

const AddScreen = () => {
  const { date } = useContext(DateContext);
  const dateProcessor = new DateProcessor(date);

  const [defaultEntry, setDefaultEntry] = useState<string>();
  const [entry, setEntry] = useState<string>();

  // const navigation = useNavigation();

  useEffect(() => {
    setDefaultEntry(EntriesStorage.get(date));
  }, [date]);

  const calendarOnTouch = () => {
    // navigation.navigate("Calendar");
  };

  return (
    <SafeAreaView style={[flex_column, ph_1]}>
      <DaySelector />
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
        disabled={defaultEntry === entry || entry === ""} // TODO: Change to error instead of disable
        onPress={() => EntriesStorage.set(date, entry as string)}
        buttonStyle={mt_10}
      />
    </SafeAreaView>
  );
};

export default AddScreen;
