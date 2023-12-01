import { View } from "react-native";
import useCalendarDates from "../../hooks/useCalendarDates";
import { colours, styles } from "../../styles";
const { flex_row_center, fs_m } = styles;
import Button from "../UI/Button";

const Calendar = () => {
  const calendarDates = useCalendarDates();
  // console.log(calendarDates);

  return (
    <View
      style={[
        flex_row_center,
        styles.justify_content_center,
        styles.gap_3,
        {
          flexWrap: "wrap",
        },
      ]}>
      {calendarDates.map((day, i) => {
        const numDay: number = +day;
        const isDayStr = Number.isNaN(numDay);
        const isDayPrevMonth = i < 14 && numDay > 20;
        const isDayNextMonth = i > 35 && numDay < 10;

        return (
          <Button
            key={`${day}${i}`}
            variant="tertiary"
            buttonStyle={[
              {
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: "11%",
              },
              styles.pv_4,
            ]}
            textStyle={[
              fs_m,
              (isDayPrevMonth || isDayNextMonth) && styles.text_grey_400,
              isDayStr && [styles.text_grey_300, styles.fs_s, styles.text_bold],
            ]}
            backgroundColour={
              isDayStr || isDayPrevMonth || isDayNextMonth
                ? colours.offWhite
                : colours.grey[900]
            }
            backgroundColourPressed={colours.grey[800]}
            disabled={isDayStr || isDayNextMonth || isDayPrevMonth}
            title={day}
          />
        );
      })}
    </View>
  );
};

export default Calendar;
