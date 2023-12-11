import { View } from "react-native";
import Calendar from "src/components/Calendar/Calendar";
import MonthSelector from "src/components/Calendar/MonthSelector";

const CalendarScreen = () => {
  return (
    <View>
      <MonthSelector />
      <Calendar />
    </View>
  );
};

export default CalendarScreen;
