import { ReactElement } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { styles } from "src/styles";
const {
  bg_primary_100,
  bg_primary_200,
  bg_primary_300,
  bg_primary_700,
  bg_primary_800,
  bg_transparent,
  br_1,
  flex_row_center,
  fs_m,
  justify_content_center,
  pv_5,
  ph_3,
  text_primary_100,
  text_primary_500,
  text_primary_900,
  w_3,
} = styles;

type Props = {
  title?: string;
  icon?: (pressed: boolean) => ReactElement;
  variant?: "primary" | "secondary" | "tertiary";
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & PressableProps;

const Button = ({
  title,
  icon,
  variant = "primary",
  buttonStyle,
  textStyle,
  ...props
}: Props) => {
  const buttonStyles: Record<
    typeof variant,
    Record<"normal" | "pressed", StyleProp<ViewStyle>>
  > = {
    primary: {
      normal: [bg_primary_300],
      pressed: [bg_primary_200],
    },
    secondary: {
      normal: [bg_primary_700],
      pressed: [bg_primary_800],
    },
    tertiary: {
      normal: [bg_transparent],
      pressed: [],
    },
  };

  const textStyles: Record<
    typeof variant,
    Record<"normal" | "pressed", StyleProp<TextStyle>>
  > = {
    primary: {
      normal: [text_primary_900],
      pressed: [text_primary_900],
    },
    secondary: {
      normal: [text_primary_100],
      pressed: [text_primary_100],
    },
    tertiary: {
      normal: [text_primary_100],
      pressed: [text_primary_500],
    },
  };

  return (
    <Pressable
      style={({ pressed }) => [
        flex_row_center,
        justify_content_center,
        pv_5,
        ph_3,
        br_1,
        buttonStyles[variant][pressed ? "pressed" : "normal"],
        buttonStyle,
      ]}
      {...props}>
      {({ pressed }) => (
        <>
          {icon?.(pressed)}
          {title && (
            <Text
              style={[
                fs_m,
                textStyles[variant][pressed ? "pressed" : "normal"],
                textStyle,
              ]}>
              {title}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
};

export default Button;
