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
  bg_primary_200,
  bg_primary_300,
  bg_primary_700,
  bg_primary_800,
  bg_red_100,
  bg_red_900,
  bg_transparent,
  br_1,
  flex_row_center,
  fs_m,
  justify_content_center,
  pv_5,
  ph_3,
  text_grey_100,
  text_grey_300,
  text_primary_100,
  text_primary_500,
  text_primary_900,
  text_red_100,
  text_red_900,
} = styles;

type Props = {
  title?: string;
  icon?: (pressed: boolean) => ReactElement;
  variant?: "primary" | "secondary" | "tertiary";
  flavour?: "normal" | "destructive";
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & PressableProps;

const Button = ({
  title,
  icon,
  variant = "primary",
  flavour = "normal",
  buttonStyle,
  textStyle,
  ...props
}: Props) => {
  const buttonStyles: Record<
    typeof variant,
    Record<typeof flavour, Record<"normal" | "pressed", StyleProp<ViewStyle>>>
  > = {
    primary: {
      normal: {
        normal: [bg_primary_300],
        pressed: [bg_primary_200],
      },
      destructive: {
        normal: [bg_red_100],
        pressed: [bg_red_100],
      },
    },
    secondary: {
      normal: {
        normal: [bg_primary_700],
        pressed: [bg_primary_800],
      },
      destructive: {
        normal: [bg_red_900],
        pressed: [bg_red_900],
      },
    },
    tertiary: {
      normal: {
        normal: [bg_transparent],
        pressed: [bg_transparent],
      },
      destructive: {
        normal: [bg_transparent],
        pressed: [bg_transparent],
      },
    },
  };

  const textStyles: Record<
    typeof variant,
    Record<typeof flavour, Record<"normal" | "pressed", StyleProp<TextStyle>>>
  > = {
    primary: {
      normal: {
        normal: [text_primary_900],
        pressed: [text_primary_900],
      },
      destructive: {
        normal: [text_red_900],
        pressed: [text_red_900],
      },
    },
    secondary: {
      normal: {
        normal: [text_primary_100],
        pressed: [text_primary_100],
      },
      destructive: {
        normal: [text_grey_100],
        pressed: [text_grey_300],
      },
    },
    tertiary: {
      normal: {
        normal: [text_primary_100],
        pressed: [text_primary_500],
      },
      destructive: {
        normal: [text_red_100],
        pressed: [text_red_900],
      },
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
        buttonStyles[variant][flavour][pressed ? "pressed" : "normal"],
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
                textStyles[variant][flavour][pressed ? "pressed" : "normal"],
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
