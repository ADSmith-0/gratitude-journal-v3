import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
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

const DaySelector = () => {
  const { date, dispatch } = useContext(DateContext);
  const dateProcessor = new DateProcessor(date);
  const today = new DateProcessor();

  const isFuture = dateProcessor.toReadableDate() === today.toReadableDate();

  const [currentDay, setCurrentDay] = useState<string>("Today");

  // biome-ignore lint/correctness/useExhaustiveDependencies: bad rule
  useEffect(() => {
    const yesterday = today.prevDay().toReadableDate();
    today.nextDay();
    if (dateProcessor.toReadableDate() === today.toReadableDate()) {
      setCurrentDay("Today");
    } else if (dateProcessor.toReadableDate() === yesterday) {
      setCurrentDay("Yesterday");
    } else {
      setCurrentDay(dateProcessor.getLongDay());
    }
  }, [date]);

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
        color={isFuture ? hiddenColour : visibleColour}
        size={fontSize.l}
      />
    );
  };

  return (
    <View style={[flex_row_center, justify_content_center]}>
      <Button
        icon={leftChevron}
        variant="tertiary"
        onPress={() => dispatch("prevDay")}
      />
      <View style={[flex_column_center, align_items_center, flex_1, mt_3]}>
        <Text variant="secondary" style={[m_5, mb_3]}>
          {dateProcessor.toReadableDate()}
        </Text>
        <Text size="l" style={m_5}>
          {currentDay}
        </Text>
      </View>
      <Button
        icon={rightChevron}
        variant="tertiary"
        onPress={() => dispatch("nextDay")}
        disabled={isFuture}
      />
    </View>
  );
};

export default DaySelector;
