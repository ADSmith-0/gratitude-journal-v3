import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { styles } from "../../styles";
const {
  align_self_end,
  bg_grey_300,
  bg_grey_600,
  bg_transparent,
  br_1,
  flex_row_center,
  fs_m,
  justify_content_center,
  mt_8,
  pv_5,
  ph_3,
  text_grey_900,
  text_grey_100,
  w_3,
} = styles;

type Props = {
  title: string;
  variant?: "primary" | "secondary" | "tertiary";
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & PressableProps;

const Button = ({
  title,
  variant = "primary",
  buttonStyle,
  textStyle,
  ...props
}: Props) => {
  let variantButtonStyle: StyleProp<ViewStyle> | undefined;
  let variantTextStyle: StyleProp<TextStyle> | undefined;

  if (variant === "primary") {
    variantButtonStyle = [bg_grey_300];
    variantTextStyle = [text_grey_900];
  } else if (variant === "secondary") {
    variantButtonStyle = [bg_grey_600];
    variantTextStyle = [text_grey_100];
  } else if (variant === "tertiary") {
    variantButtonStyle = [bg_transparent];
    variantTextStyle = [text_grey_100];
  }

  return (
    <Pressable
      style={[
        w_3,
        flex_row_center,
        justify_content_center,
        align_self_end,
        pv_5,
        ph_3,
        mt_8,
        br_1,
        variantButtonStyle,
        buttonStyle,
      ]}
      {...props}>
      <Text style={[fs_m, variantTextStyle, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;
