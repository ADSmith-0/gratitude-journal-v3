import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Calendar from "../components/Calendar";

const AddScreen = () => {
  return (
    <SafeAreaView>
      <Calendar />
      <TextInput editable multiline numberOfLines={4} style={{ borderWidth: 1 }} />
    </SafeAreaView>
  )
}

export default AddScreen;
