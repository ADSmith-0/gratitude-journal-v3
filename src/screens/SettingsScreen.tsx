import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext } from "react";
import { View } from "react-native";
import Switch from "src/components/UI/Switch";
import Text from "src/components/UI/Text";
import { ReminderContext } from "src/context/ReminderContext/ReminderContext";
import { styles } from "src/styles";

const {
  bg_offWhite,
  border_1,
  border_grey_800,
  br_1,
  flex_column_center,
  flex_row_center,
  justify_content_between,
  ph_8,
  pv_5,
  mh_7,
  mt_8,
} = styles;

const SettingsScreen = () => {
  const { reminder, dispatch } = useContext(ReminderContext);
  return (
    <View
      style={[
        flex_column_center,
        mt_8,
        br_1,
        bg_offWhite,
        border_1,
        border_grey_800,
        pv_5,
        ph_8,
        mh_7,
      ]}>
      <View style={[flex_row_center, justify_content_between]}>
        <Text>Notifications</Text>
        <Switch
          isEnabled={reminder.isEnabled}
          onChange={isEnabled =>
            dispatch({ action: isEnabled ? "enable" : "disable" })
          }
        />
      </View>
      {/* FIX: change value to be reminder.time */}
      {reminder.isEnabled && (
        <View>
          <DateTimePicker mode="time" value={new Date()} />
        </View>
      )}
    </View>
  );
};

export default SettingsScreen;
