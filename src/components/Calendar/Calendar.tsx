import { View } from "react-native";
import Text from "../UI/Text";
import useDates from "../../hooks/useDates";
import { styles } from "../../styles";

const Calendar = () => {
  const dates = useDates();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <View style={styles.flex_column_center}>
      <View style={styles.flex_row_center}>
        {days.map(day => (
          <Text key={day}>{day}</Text>
        ))}
      </View>
      <View style={styles.flex_row_center}>
        {dates.map(date => (
          <Text>{date || " "}</Text>
        ))}
      </View>
    </View>
  );
};

export default Calendar;
