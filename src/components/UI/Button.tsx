import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  variant?: "primary" | "secondary" | "tertiary";
  style?: StyleProp<ViewStyle>;
} & PressableProps;

const Button = ({ title, variant = "primary", style, ...props }: Props) => {
  let variantStyle: object[];

  if (variant === "tertiary") {
    variantStyle = [];
  }

  if (variant === "secondary") {
    variantStyle = [];
  }

  variantStyle ??= [];

  return (
    <Pressable style={[variantStyle, style]} {...props}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default Button;
