import { ReactNode } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "src/styles";
import Text from "src/components/UI/Text";

const { bg_white, border_1, br_1, fs_m, mb_3, pl_5, text_grey_100 } = styles;

type Props = {
  label?: string;
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

const Input = ({ label = "", style, containerStyle, ...props }: Props) => (
  <View style={containerStyle}>
    {label && <Text style={mb_3}>{label}</Text>}
    <TextInput
      style={[bg_white, text_grey_100, fs_m, border_1, br_1, pl_5, style]}
      {...props}
    />
  </View>
);

export default Input;
