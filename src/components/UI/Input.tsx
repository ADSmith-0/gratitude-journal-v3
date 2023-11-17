import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { styles } from "../../styles";
import Label from "./Label";
const {
  bg_grey_900,
  border_1,
  br_1,
  flex_1,
  flex_row_center,
  fs_m,
  mb_4,
  mt_8,
  pl_4,
  p_2,
  text_grey_100,
} = styles;

type Props = {
  label?: string;
  icon?: ReactNode;
} & TextInputProps;

const Input = ({ icon, label, onTouchStart, style, ...props }: Props) => (
  <View style={[mt_8]}>
    {label && <Label>{label}</Label>}
    {icon ? (
      <View
        style={[
          flex_row_center,
          bg_grey_900,
          border_1,
          br_1,
          mb_4,
          pl_4,
          p_2,
          style,
        ]}
        onTouchStart={onTouchStart}>
        {icon}
        <TextInput style={[flex_1, text_grey_100, fs_m, pl_4]} {...props} />
      </View>
    ) : (
      <TextInput
        style={[bg_grey_900, text_grey_100, fs_m, border_1, br_1, style]}
        {...props}
      />
    )}
  </View>
);

export default Input;
