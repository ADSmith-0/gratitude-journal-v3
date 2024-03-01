/* eslint-disable react/no-unstable-nested-components */
import Text from "src/components/UI/Text";
import auth from "@react-native-firebase/auth";
import AuthFragment from "./AuthFragment";
import { createStackNavigator } from "@react-navigation/stack";
import { colours } from "src/styles";
import SettingsButton from "src/components/Navigation/SettingsButton";

const Stack = createStackNavigator();

const AccountScreen = () => {
  if (auth().currentUser) {
    return <Text>{`Welcome ${auth().currentUser}`}</Text>;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: colours.offWhite },
        headerRight: () => <SettingsButton />,
      }}>
      <Stack.Screen name="Login">
        {props => <AuthFragment {...props} type="Login" />}
      </Stack.Screen>
      <Stack.Screen name="Sign up">
        {props => <AuthFragment {...props} type="Sign up" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AccountScreen;
