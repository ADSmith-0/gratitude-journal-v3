import { View } from "react-native";
import { ViewProps } from "react-native/types";
import { styles } from "src/styles";

const {
  flex_column_center,
  br_1,
  bg_offWhite,
  border_1,
  border_grey_800,
  p_5,
} = styles;

const Box = ({ children, style, ...props }: ViewProps) => (
  <View
    style={[
      flex_column_center,
      br_1,
      bg_offWhite,
      border_1,
      border_grey_800,
      p_5,
      style,
    ]}
    {...props}>
    {children}
  </View>
);

export default Box;
