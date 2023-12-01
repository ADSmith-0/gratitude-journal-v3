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
      {calendarDates.map((day, i) => (
        <Button
          key={`${day}${i}`}
          variant="tertiary"
          buttonStyle={[
            {
              flexGrow: 0,
              flexShrink: 1,
              flexBasis: "11%",
            },
          ]}
          textStyle={[
            fs_m,
            i < 14 && +day > 20 && styles.text_grey_400,
            i < 7 && [styles.text_grey_400, styles.fs_s, styles.text_bold],
          ]}
          backgroundColour={colours.grey[900]}
          backgroundColourPressed={colours.grey[800]}
          disabled={i < 14 && +day > 20}
          title={day}
        />
      ))}
    </View>
  );
};

export default Calendar;
