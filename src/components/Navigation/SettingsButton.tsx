import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Settings } from "lucide-react-native";
import Button from "src/components/UI/Button";
import { colours, fontSize, styles } from "src/styles";

const { mr_5 } = styles;

const SettingsButton = () => {
  const navigation =
    useNavigation<StackNavigationProp<{ Settings: undefined }, "Settings">>();

  const settingsIcon = (pressed: boolean) => (
    <Settings color={colours.grey[pressed ? 300 : 100]} size={fontSize.l} />
  );

  return (
    <Button
      buttonStyle={mr_5}
      icon={settingsIcon}
      variant="tertiary"
      onPress={() => navigation.navigate("Settings")}
    />
  );
};

export default SettingsButton;
