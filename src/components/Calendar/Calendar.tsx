import { View } from "react-native";
import useCalendarDates from "../../hooks/useCalendarDates";
import { styles } from "../../styles";
const { flex_row_center, gap_4, fs_m } = styles;
import Button from "../UI/Button";

const Calendar = () => {
  const calendarDates = useCalendarDates();
  console.log(calendarDates);

  return (
    <View
      style={[
        flex_row_center,
        styles.justify_content_center,
        gap_4,
        {
          flexWrap: "wrap",
        },
      ]}>
      {calendarDates.map((day, i) => (
        <Button
          key={`${day}${i}`}
          variant="secondary"
          buttonStyle={{
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: "11%",
          }}
          textStyle={[fs_m]}
          disabled={!+day}
          title={day}
        />
      ))}
    </View>
  );
};

export default Calendar;
