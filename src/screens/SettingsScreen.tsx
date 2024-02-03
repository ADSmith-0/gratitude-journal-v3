import { useContext } from "react";
import { View } from "react-native";
import Switch from "src/components/UI/Switch";
import Text from "src/components/UI/Text";
import { NotificationsEnabledContext } from "src/context/NotificationsEnabledContext/NotificationsEnabled";
import { styles } from "src/styles";

const { flex_column_center, flex_row_center, justify_content_around, mt_8 } =
  styles;

const SettingsScreen = () => {
  const { notificationsEnabled, setNotificationsEnabled } = useContext(
    NotificationsEnabledContext,
  );
  return (
    <View style={[flex_column_center, mt_8]}>
      <View style={[flex_row_center, justify_content_around]}>
        <Text>Notifications</Text>
        <Switch
          isEnabled={notificationsEnabled}
          onChange={isEnabled => setNotificationsEnabled(isEnabled)}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
