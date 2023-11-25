import { Text as RNText, TextProps } from "react-native";
import { styles } from "../../styles";
const { text_grey_100, fs_m } = styles;

const Text = ({ children, style, ...props }: TextProps) => {
  return (
    <RNText style={[text_grey_100, fs_m, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
