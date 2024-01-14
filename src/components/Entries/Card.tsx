import { View } from "react-native";
import Text from "src/components/UI/Text";
import { colours, styles } from "src/styles";
import { DateString } from "src/types";
const { bg_white, border_grey_800, br_1, bw_1, mb_5, p_5 } = styles;

type props = {
  date: DateString;
  entry: string;
};

const Card = ({ date, entry }: props) => {
  // console.log(date, entry);
  return (
    <View style={[bg_white, p_5, br_1, bw_1, border_grey_800, mb_5]}>
      <Text>{date}</Text>
      <Text>{entry}</Text>
    </View>
  );
};

export default Card;
