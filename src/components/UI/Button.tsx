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
  bg_primary_200,
  bg_primary_300,
  bg_primary_700,
  bg_primary_800,
  bg_transparent,
  br_1,
  flex_row_center,
  fs_m,
  justify_content_center,
  mt_8,
  pv_5,
  ph_3,
  text_grey_900,
  text_primary_100,
  text_primary_500,
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
  const variantButtonStyle: Record<
    "normal" | "pressed",
    StyleProp<ViewStyle> | undefined
  > = {
    normal: undefined,
    pressed: undefined,
  };

  const variantTextStyle: Record<
    "normal" | "pressed",
    StyleProp<TextStyle> | undefined
  > = {
    normal: undefined,
    pressed: undefined,
  };

  if (variant === "primary") {
    variantButtonStyle.normal = [bg_primary_300];
    variantButtonStyle.pressed = [bg_primary_200];
    variantTextStyle.normal = [text_grey_900];
    variantTextStyle.pressed = [text_grey_900];
  } else if (variant === "secondary") {
    variantButtonStyle.normal = [bg_primary_700];
    variantButtonStyle.pressed = [bg_primary_800];
    variantTextStyle.normal = [text_primary_100];
    variantTextStyle.pressed = [text_primary_100];
  } else if (variant === "tertiary") {
    variantButtonStyle.normal = [bg_transparent];
    variantButtonStyle.pressed = [bg_transparent];
    variantTextStyle.normal = [text_primary_100];
    variantTextStyle.pressed = [text_primary_500];
  }

  return (
    <Pressable
      style={({ pressed }) => [
        w_3,
        flex_row_center,
        justify_content_center,
        align_self_end,
        pv_5,
        ph_3,
        mt_8,
        br_1,
        pressed ? variantButtonStyle.pressed : variantButtonStyle.normal,
        buttonStyle,
      ]}
      {...props}>
      {({ pressed }) => (
        <Text
          style={[
            fs_m,
            pressed ? variantTextStyle.pressed : variantTextStyle.normal,
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
