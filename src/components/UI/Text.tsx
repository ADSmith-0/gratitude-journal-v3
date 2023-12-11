import { Text as RNText, TextProps, TextStyle } from "react-native";
import { colours, fontSize, styles } from "src/styles";
const { text_grey_100, fs_m } = styles;

type Props = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "s" | "m" | "l" | "xl";
} & TextProps;

const Text = ({
  children,
  style,
  variant = "primary",
  size = "m",
  ...props
}: Props) => {
  const textColour: Record<typeof variant, TextStyle["color"]> = {
    primary: colours.grey[100],
    secondary: colours.grey[300],
    tertiary: colours.grey[500],
  };

  return (
    <RNText
      style={[
        text_grey_100,
        fs_m,
        { color: textColour[variant], fontSize: fontSize[size] },
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};

export default Text;
