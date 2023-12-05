import { StyleSheet, View } from "react-native";
import useCalendarDates from "../../hooks/useCalendarDates";
import { styles } from "../../styles";
import { days } from "../../utils/global";
import Text from "../UI/Text";
const {
  bg_primary_800,
  bg_grey_900,
  bg_offWhite,
  flex_row_center,
  flex_wrap,
  fs_m,
  fs_s,
  gap_3,
  justify_content_center,
  mb_4,
  mt_5,
  pv_3,
  text_bold,
  text_align_center,
  text_grey_300,
  text_grey_400,
} = styles;
import Button from "../UI/Button";
import { DateRelativeToToday } from "../../types";

const { row } = StyleSheet.create({
  row: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "11%",
  },
});

const Calendar = () => {
  const calendarDates = useCalendarDates();

  // change screens to just add screen, autosave, calendar list as part of clicking on date

  return (
    <View
      style={[flex_row_center, justify_content_center, flex_wrap, mt_5, gap_3]}>
      {days.map((day, i) => (
        <Text
          key={day + i}
          style={[
            row,
            text_align_center,
            text_bold,
            fs_s,
            text_grey_300,
            mb_4,
          ]}>
          {day}
        </Text>
      ))}
      {calendarDates.map(({ date, relativeToToday, hasEntry }, i) =>
        date === " " ? (
          <Text key={`${date}${i}`} style={row} />
        ) : (
          <Button
            key={`${date}${i}`}
            variant={"secondary"}
            buttonStyle={[
              row,
              pv_3,
              bg_grey_900,
              hasEntry && bg_primary_800,
              relativeToToday === DateRelativeToToday.OUT_OF_BOUNDS &&
                bg_offWhite,
            ]}
            textStyle={[
              fs_m,
              relativeToToday === DateRelativeToToday.OUT_OF_BOUNDS &&
                text_grey_400,
            ]}
            title={date}
          />
        ),
      )}
    </View>
  );
};

export default Calendar;
