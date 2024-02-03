import { Switch as RNSwitch } from "react-native";
import { colours } from "src/styles";

type Props = {
  isEnabled: boolean;
  onChange: (newIsEnabled: boolean) => void;
};

const Switch = ({ isEnabled, onChange }: Props) => (
  <RNSwitch
    trackColor={{ false: colours.grey[500], true: colours.primary[500] }}
    thumbColor={!isEnabled ? colours.grey[800] : colours.primary[800]}
    ios_backgroundColor={colours.primary[100]}
    value={isEnabled}
    onValueChange={value => onChange(value)}
  />
);

export default Switch;
