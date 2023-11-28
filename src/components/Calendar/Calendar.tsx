import { View } from "react-native";
import useCalendarDates from "../../hooks/useCalendarDates";
import { colours, styles } from "../../styles";
const {
  align_items_center,
  flex_1,
  flex_column_center,
  flex_row_center,
  gap_4,
  fs_m,
  h_1,
  mb_3,
  p_7,
  ph_0,
  pv_0,
  text_align_center,
  text_transparent,
  w_1,
} = styles;
import Button from "../UI/Button";
import Text from "../UI/Text";

const Calendar = () => {
  const calendarDates = useCalendarDates();
  const [days, ...dates]: string[][] = calendarDates;

  return (
    <View style={[flex_column_center, p_7, gap_4]}>
      <View style={[flex_row_center, align_items_center, gap_4, mb_3]}>
        {days.map(day => (
          <Text key={day} style={[flex_1, text_align_center]}>
            {day}
          </Text>
        ))}
      </View>
      {dates.map((week, i) => (
        <View style={[flex_row_center, gap_4]}>
          {week.map((day, j) => (
            <Button
              key={`${day}${i}${j}`}
              variant={+day ? "secondary" : "tertiary"}
              buttonStyle={[flex_1, h_1, w_1, pv_0, ph_0]}
              backgroundColour={+day ? colours.grey[800] : undefined}
              backgroundColourPressed={colours.grey[100]}
              textStyle={[fs_m, !+day && text_transparent]}
              disabled={!+day}
              title={day}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Calendar;
