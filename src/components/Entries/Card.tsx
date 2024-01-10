import { View } from "react-native";
import { styles } from "src/styles";
import { DateString } from "src/types";
import Text from "src/components/UI/Text";

type props = {
  date: DateString;
  entry: string;
};

const Card = ({ date, entry }: props) => {
  // console.log(date, entry);
  return (
    <View style={[styles.bg_white, styles.p_5, styles.br_1, styles.mb_5]}>
      <Text>{date}</Text>
      <Text>{entry}</Text>
    </View>
  );
};

export default Card;
