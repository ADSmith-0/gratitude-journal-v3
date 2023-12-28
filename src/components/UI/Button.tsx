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
  align_self_end,
  br_1,
  flex_row_center,
  fs_m,
  justify_content_center,
  pv_5,
  ph_3,
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
      normal: [styles.bg_primary_300],
      pressed: [styles.bg_grey_200],
    },
    secondary: {
      normal: [styles.bg_primary_700],
      pressed: [styles.bg_primary_100],
    },
    tertiary: {
      normal: [styles.bg_transparent],
      pressed: [],
    },
  };

  const textStyles: Record<
    typeof variant,
    Record<"normal" | "pressed", StyleProp<TextStyle>>
  > = {
    primary: {
      normal: [styles.text_primary_900],
      pressed: [],
    },
    secondary: {
      normal: [styles.text_primary_100],
      pressed: [],
    },
    tertiary: {
      normal: [styles.text_primary_100],
      pressed: [styles.text_primary_500],
    },
  };

  return (
    <Pressable
      style={({ pressed }) => [
        w_3,
        flex_row_center,
        justify_content_center,
        align_self_end,
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
