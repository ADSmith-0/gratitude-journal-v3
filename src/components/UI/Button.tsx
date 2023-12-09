import { cloneElement, ReactElement } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colours, styles } from "../../styles";
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
  icon?: ReactElement;
  variant?: "primary" | "secondary" | "tertiary";
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColour?: ViewStyle["backgroundColor"];
  backgroundColourPressed?: ViewStyle["backgroundColor"];
} & PressableProps;

// TODO Clean up this component

const Button = ({
  title,
  icon,
  variant = "primary",
  buttonStyle,
  textStyle,
  backgroundColour,
  backgroundColourPressed,
  ...props
}: Props) => {
  const variantStyle: Record<
    typeof variant,
    Record<
      "pressed" | "normal",
      Pick<ViewStyle, "backgroundColor"> & Pick<TextStyle, "color">
    >
  > = {
    primary: {
      normal: {
        backgroundColor: backgroundColour ?? colours.primary[300],
        color: colours.grey[900],
      },
      pressed: {
        backgroundColor: backgroundColourPressed ?? colours.primary[200],
        color: colours.grey[900],
      },
    },
    secondary: {
      normal: {
        backgroundColor: backgroundColour ?? colours.primary[800],
        color: colours.primary[100],
      },
      pressed: {
        backgroundColor: backgroundColourPressed ?? colours.primary[700],
        color: colours.primary[100],
      },
    },
    tertiary: {
      normal: {
        backgroundColor: backgroundColour ?? "transparent",
        color: colours.primary[100],
      },
      pressed: {
        backgroundColor: backgroundColourPressed ?? "transparent",
        color: colours.primary[500],
      },
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
        {
          backgroundColor:
            variantStyle[variant][pressed ? "pressed" : "normal"]
              .backgroundColor,
        },
        buttonStyle,
      ]}
      {...props}>
      {({ pressed }) => (
        <>
          {icon &&
            cloneElement(icon, {
              color:
                variantStyle[variant][pressed ? "pressed" : "normal"].color,
            })}
          {title && (
            <Text
              style={[
                fs_m,
                {
                  color:
                    variantStyle[variant][pressed ? "pressed" : "normal"].color,
                },
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
