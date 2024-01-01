import { StyleSheet, View } from "react-native";
import useCalendarDates from "src/hooks/useCalendarDates";
import { styles } from "src/styles";
import { days } from "src/utils/globals";
import Text from "src/components/UI/Text";
const {
  bg_primary_800,
  flex_row_center,
  flex_wrap,
  fs_m,
  fs_s,
  gap_3,
  justify_content_center,
  mb_7,
  mt_8,
  pv_3,
  row_gap_5,
  text_bold,
  text_align_center,
  text_grey_300,
  text_grey_800,
} = styles;
import Button from "src/components/UI/Button";
import { DateTag } from "src/types";
import { DateContext } from "src/context/DateContext/DateContext";
import { useContext } from "react";
import DateProcessor from "src/utils/DateProcessor";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const { row } = StyleSheet.create({
  row: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "11%",
  },
});

const Calendar = () => {
  const calendarDates = useCalendarDates();

  const { date, dispatch } = useContext(DateContext);

  const navigation =
    useNavigation<StackNavigationProp<{ Tabs: undefined }, "Tabs">>();

  const updateDate = (currentDate: number): void => {
    const newDate = new DateProcessor(date);
    newDate.date.setDate(currentDate);
    dispatch({ action: "setDate", newDate: newDate.getValue() });
    navigation.navigate("Tabs");
  };

  return (
    <View
      style={[
        flex_row_center,
        justify_content_center,
        flex_wrap,
        mt_8,
        gap_3,
        row_gap_5,
      ]}>
      {days.map(day => (
        <Text
          key={day}
          style={[row, text_align_center, fs_s, text_grey_300, mb_7]}>
          {day}
        </Text>
      ))}
      {calendarDates.map(({ date: currentDate, dateTag, hasEntry }, i) =>
        currentDate === " " ? (
          <Text key={`${currentDate}${i}`} style={row} />
        ) : (
          <Button
            key={currentDate}
            variant="tertiary"
            buttonStyle={[row, pv_3, hasEntry && bg_primary_800]}
            textStyle={[
              fs_m,
              text_bold,
              dateTag === DateTag.INVALID && text_grey_800,
            ]}
            onPress={() => updateDate(+currentDate)}
            title={currentDate}
          />
        ),
      )}
    </View>
  );
};

export default Calendar;
