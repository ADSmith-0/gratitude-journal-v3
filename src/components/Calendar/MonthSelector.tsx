import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useContext } from "react";
import { View } from "react-native";
import Text from "../UI/Text";
import { DateContext } from "../../context/DateContext/DateContext";
import { styles } from "../../styles";
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
import DateProcessor from "../../utils/DateProcessor";
import Button from "../UI/Button";

const MonthSelector = () => {
  const { date, dispatch } = useContext(DateContext);
  const dateProcessor = new DateProcessor(date);

  return (
    <View style={[flex_row_center, justify_content_center]}>
      <Button
        icon={<ChevronLeft size={20} />}
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
        icon={<ChevronRight size={20} />}
        variant="tertiary"
        onPress={() => dispatch("nextMonth")}
      />
    </View>
  );
};

export default MonthSelector;
