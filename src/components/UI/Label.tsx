import { Text, TextProps } from "react-native";
import { styles } from "../../styles";
const { text_grey_100, fs_m, mb_4 } = styles;

const Label = ({ children, style, ...props }: TextProps) => {
	return (
		<Text style={[text_grey_100, fs_m, mb_4, style]} {...props}>
			{children}
		</Text>
	);
};

export default Label;
