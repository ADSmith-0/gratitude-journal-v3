import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import { View } from "react-native";
import Button from "src/components/UI/Button";
import Switch from "src/components/UI/Switch";
import Text from "src/components/UI/Text";
import { ReminderContext } from "src/context/ReminderContext/ReminderContext";
import { styles } from "src/styles";
import DateProcessor from "src/utils/DateProcessor";

const {
  bg_offWhite,
  border_1,
  border_grey_800,
  br_1,
  flex_column_center,
  flex_row_center,
  fs_l,
  justify_content_between,
  justify_content_start,
  p_0,
  ph_8,
  pl_3,
  pv_5,
  mh_7,
  mt_8,
  text_grey_100,
  text_grey_500,
} = styles;

const SettingsScreen = () => {
  const { reminderConfig, dispatchUpdateReminderConfig } =
    useContext(ReminderContext);
  // FIX: Make reminder open app on click

  console.log(
    "settings screen reminderConfig:",
    reminderConfig.callAt.date instanceof Date,
  );

  const [isTimePickerVisible, setIsTimePickerVisible] =
    useState<boolean>(false);

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
      <Text style={pl_3}>Reminder</Text>
      <View style={[flex_row_center, justify_content_between]}>
        <Button
          variant="tertiary"
          buttonStyle={[justify_content_start, p_0]}
          textStyle={[
            fs_l,
            reminderConfig.isEnabled ? text_grey_100 : text_grey_500,
          ]}
          title={reminderConfig.callAt.date.toTimeString().slice(0, 5)}
          onPress={() => setIsTimePickerVisible(true)}
          disabled={!reminderConfig.isEnabled}
        />
        <Switch
          isEnabled={reminderConfig.isEnabled}
          onChange={isEnabled =>
            dispatchUpdateReminderConfig({
              action: isEnabled ? "enable" : "disable",
            })
          }
        />
        {isTimePickerVisible && (
          <DateTimePicker
            mode="time"
            value={reminderConfig.callAt.date}
            onChange={e => {
              setIsTimePickerVisible(false);
              dispatchUpdateReminderConfig({
                action: "updateCallAt",
                newCallAt: new DateProcessor(e.nativeEvent.timestamp),
              });
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SettingsScreen;
