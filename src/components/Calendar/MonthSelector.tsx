import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useContext } from "react";
import { Text, View } from "react-native";
import { DateContext } from "../../context/DateContext/DateContext";
import { styles } from "../../styles";
const {
  align_items_center,
  flex_row_center,
  flex_column_center,
  justify_content_center,
} = styles;
import DateProcessor from "../../utils/DateProcessor";
import Button from "../UI/Button";

const MonthSelector = () => {
  const { date, dispatch } = useContext(DateContext);
  const dateProcessor = new DateProcessor(date);

  const leftChevron = (pressed: boolean) => (
    <ChevronLeft color={pressed ? "black" : "blue"} size={20} />
  );

  const rightChevron = (pressed: boolean) => (
    <ChevronRight color={pressed ? "black" : "blue"} size={20} />
  );

  return (
    <View style={[flex_row_center, justify_content_center]}>
      <Button
        icon={leftChevron}
        variant="tertiary"
        onPress={() => dispatch("prevMonth")}
      />
      <View style={[flex_column_center, align_items_center]}>
        <Text>{dateProcessor.getYear()}</Text>
        <Text>{dateProcessor.getLongMonth()}</Text>
      </View>
      <Button
        icon={rightChevron}
        variant="tertiary"
        onPress={() => dispatch("nextMonth")}
      />
    </View>
  );
};

export default MonthSelector;
