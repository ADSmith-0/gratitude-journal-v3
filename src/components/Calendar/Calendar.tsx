import { StyleSheet, View } from "react-native";
import useCalendarDates from "../../hooks/useCalendarDates";
import { styles } from "../../styles";
import { days } from "../../utils/globals";
import Text from "../UI/Text";
const {
  bg_primary_800,
  flex_row_center,
  flex_wrap,
  fs_m,
  fs_s,
  gap_3,
  justify_content_center,
  mb_4,
  mt_8,
  pv_3,
  text_bold,
  text_align_center,
  text_grey_300,
  text_grey_800,
} = styles;
import Button from "../UI/Button";
import { DateTag } from "../../types";

const { row } = StyleSheet.create({
  row: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "11%",
  },
});

const Calendar = () => {
  const calendarDates = useCalendarDates();
  // TODO: Change screens to just add screen, autosave, calendar list as part of clicking on date

  return (
    <View
      style={[flex_row_center, justify_content_center, flex_wrap, mt_8, gap_3]}>
      {days.map(day => (
        <Text
          key={day}
          style={[row, text_align_center, fs_s, text_grey_300, mb_4]}>
          {day}
        </Text>
      ))}
      {calendarDates.map(({ date, dateTag, hasEntry }, i) =>
        date === " " ? (
          <Text key={`${date}${i}`} style={row} />
        ) : (
          <Button
            key={date}
            variant="tertiary"
            buttonStyle={[row, pv_3, hasEntry && bg_primary_800]}
            textStyle={[
              fs_m,
              text_bold,
              dateTag === DateTag.INVALID && text_grey_800,
            ]}
            title={date}
          />
        ),
      )}
    </View>
  );
};

export default Calendar;
