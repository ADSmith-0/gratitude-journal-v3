import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useContext } from "react";
import { View } from "react-native";
import Text from "src/components/UI/Text";
import { DateContext } from "src/context/DateContext/DateContext";
import { colours, fontSize, styles } from "src/styles";
const {
  align_items_center,
  flex_1,
  flex_column_center,
  flex_row_center,
  justify_content_center,
  m_5,
  mb_3,
  mt_3,
} = styles;
import Button from "src/components/UI/Button";
import DateProcessor from "src/utils/DateProcessor";

const MonthSelector = () => {
  const { date, dispatch } = useContext(DateContext);
  const dateProcessor = new DateProcessor(date);
  const today = new DateProcessor();

  const leftChevron = (pressed: boolean) => (
    <ChevronLeft
      color={pressed ? colours.grey[500] : colours.grey[100]}
      size={fontSize.l}
    />
  );

  const rightChevron = (pressed: boolean) => {
    const hiddenColour = colours.offWhite;
    const visibleColour = pressed ? colours.grey[500] : colours.grey[100];

    return (
      <ChevronRight
        color={
          dateProcessor.getMonthYear() === today.getMonthYear()
            ? hiddenColour
            : visibleColour
        }
        size={fontSize.l}
      />
    );
  };

  return (
    <View style={[flex_row_center, justify_content_center]}>
      <Button
        icon={leftChevron}
        variant="tertiary"
        onPress={() => dispatch("prevMonth")}
      />
      <View style={[flex_column_center, align_items_center, flex_1, mt_3]}>
        <Text variant="secondary" style={[m_5, mb_3]}>
          {dateProcessor.date.getFullYear()}
        </Text>
        <Text size="l" style={m_5}>
          {dateProcessor.getLongMonth()}
        </Text>
      </View>
      <Button
        icon={rightChevron}
        variant="tertiary"
        onPress={() => dispatch("nextMonth")}
        disabled={dateProcessor.getMonthYear() === today.getMonthYear()}
      />
    </View>
  );
};

export default MonthSelector;
