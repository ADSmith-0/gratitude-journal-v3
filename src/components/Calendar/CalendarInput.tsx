import { CalendarDays } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import { colours, styles, fontSize } from "../../styles";
const {
	align_items_center,
	br_1,
	bg_grey_900,
	flex_1,
	flex_row,
	fs_m,
	mv_5,
	pl_4,
	p_2,
} = styles;
import DateFormatter from "../../utils/DateFormatter";

const CalendarInput = () => {
	const [date, setDate] = useState<string>(
		new DateFormatter().toReadableDate(),
	);

	return (
		<View
			style={[flex_row, align_items_center, bg_grey_900, br_1, mv_5, pl_4, p_2]}
		>
			<CalendarDays
				style={bg_grey_900}
				color={colours.grey[100]}
				size={fontSize.l}
			/>
			<TextInput style={[flex_1, bg_grey_900, fs_m, pl_4]} value={date} />
		</View>
	);
};

export default CalendarInput;
