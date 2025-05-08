/* eslint-disable react/no-unstable-nested-components */
import AuthFragment from "./AuthFragment";
import { createStackNavigator } from "@react-navigation/stack";
import { colours, fontSize } from "src/styles";
import SettingsButton from "src/components/Navigation/SettingsButton";
import { useContext, useLayoutEffect } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { TabList } from "App";
import { UserContext } from "src/context/UserContext/UserContext";
import LoginScreen from "./LoginScreen";
import Button from "src/components/UI/Button";
import { Menu } from "lucide-react-native";

const Stack = createStackNavigator();

type Props = {
  navigation: DrawerNavigationProp<TabList, "Account">;
};

const AccountScreen = ({ navigation }: Props) => {
  const user = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !!user,
    });
  }, [user]);

  if (user) {
    return <LoginScreen user={user} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: colours.offWhite },
        headerRight: () => <SettingsButton />,
      }}>
      <Stack.Screen
        name="Login"
        options={{
          headerLeft: () => (
            <Button
              variant="tertiary"
              onPress={navigation.toggleDrawer}
              icon={() => <Menu color={colours.grey[100]} size={fontSize.xl} />}
            />
          ),
        }}>
        {props => <AuthFragment {...props} type="Login" />}
      </Stack.Screen>
      <Stack.Screen name="Sign up">
        {props => <AuthFragment {...props} type="Sign up" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AccountScreen;
