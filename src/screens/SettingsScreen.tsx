import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View } from "react-native";
import Button from "src/components/UI/Button";
import Switch from "src/components/UI/Switch";
import Text from "src/components/UI/Text";
import useLocalStorage from "src/hooks/useLocalStorage";
import { styles } from "src/styles";
import DateProcessor from "src/utils/DateProcessor";

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
  const [reminderConfig, setReminderConfig] =
    useLocalStorage("reminder-config");
  // FIX: Make reminder open app on click

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
      <Text style={[styles.pl_3]}>Reminder</Text>
      <View style={[flex_row_center, justify_content_between]}>
        <Button
          variant="tertiary"
          buttonStyle={[styles.justify_content_start, styles.p_0]}
          textStyle={[
            styles.fs_l,
            reminderConfig.isEnabled
              ? styles.text_grey_100
              : styles.text_grey_500,
          ]}
          title={new Date(reminderConfig.time).toTimeString().slice(0, 5)}
          onPress={() => setIsTimePickerVisible(true)}
          disabled={!reminderConfig.isEnabled}
        />
        <Switch
          isEnabled={reminderConfig.isEnabled}
          onChange={isEnabled =>
            setReminderConfig(prevConfig => ({
              ...prevConfig,
              isEnabled,
            }))
          }
        />
        {isTimePickerVisible && (
          <DateTimePicker
            mode="time"
            value={new Date(reminderConfig.time)}
            onChange={e => {
              const dateProcessor = new DateProcessor(e.nativeEvent.timestamp);
              setIsTimePickerVisible(false);
              setReminderConfig(prevConfig => ({
                ...prevConfig,
                time: dateProcessor.date,
              }));
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SettingsScreen;
