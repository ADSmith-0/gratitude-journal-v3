import { View } from "react-native";
import Calendar from "../components/Calendar/Calendar";
import MonthSelector from "../components/Calendar/MonthSelector";

const CalendarScreen = () => {
  return (
    <View>
      <MonthSelector />
      <Calendar />
    </View>
  );
};

export default CalendarScreen;
