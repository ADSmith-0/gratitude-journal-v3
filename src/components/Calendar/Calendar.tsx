import { StyleSheet, View } from "react-native";
import useCalendarDates from "../../hooks/useCalendarDates";
import { styles } from "../../styles";
import { days } from "../../utils/global";
import Text from "../UI/Text";
const { flex_row_center, fs_m } = styles;
import Button from "../UI/Button";
import { DateRelativeToToday } from "../../types";

const Calendar = () => {
  const calendarDates = useCalendarDates();

  // change screens to just add screen, autosave, calendar list as part of clicking on date

  return (
    <View
      style={[
        flex_row_center,
        styles.justify_content_center,
        styles.flex_wrap,
        styles.mt_5,
        styles.gap_3,
      ]}>
      {days.map((day, i) => (
        <Text
          key={day + i}
          style={[
            calendarStyles.row,
            styles.text_align_center,
            styles.text_bold,
            styles.fs_s,
            styles.text_grey_300,
            styles.mb_4,
          ]}>
          {day}
        </Text>
      ))}
      {calendarDates.map(({ date, relativeToToday, hasEntry }, i) => (
        <Button
          key={`${date}${i}`}
          variant={"secondary"}
          buttonStyle={[
            calendarStyles.row,
            styles.pv_3,
            styles.bg_grey_900,
            hasEntry && styles.bg_primary_800,
            relativeToToday === DateRelativeToToday.OUT_OF_BOUNDS &&
              styles.bg_offWhite,
          ]}
          textStyle={[
            fs_m,
            relativeToToday === DateRelativeToToday.OUT_OF_BOUNDS &&
              styles.text_grey_400,
          ]}
          title={date}
        />
      ))}
    </View>
  );
};

const calendarStyles = StyleSheet.create({
  row: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "11%",
  },
});

export default Calendar;
