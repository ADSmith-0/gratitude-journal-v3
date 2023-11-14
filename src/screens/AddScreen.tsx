import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarInput from "../components/Calendar/CalendarInput";
import { spacing } from "../styles";

const AddScreen = () => {
	return (
		<SafeAreaView
			style={{ display: "flex", flexDirection: "column", paddingHorizontal: spacing[10] }}
		>
      <CalendarInput />
			<TextInput
				editable
				multiline
				numberOfLines={4}
				style={{ borderWidth: 1 }}
			/>
		</SafeAreaView>
	);
};

export default AddScreen;
