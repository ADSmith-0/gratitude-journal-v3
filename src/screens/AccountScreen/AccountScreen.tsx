/* eslint-disable react/no-unstable-nested-components */
import Text from "src/components/UI/Text";
import auth from "@react-native-firebase/auth";
import AuthFragment from "./AuthFragment";
import { createStackNavigator } from "@react-navigation/stack";
import { colours } from "src/styles";
import SettingsButton from "src/components/Navigation/SettingsButton";
import ContentWrapper from "src/components/Screen/ContentWrapper";
import Button from "src/components/UI/Button";
import { useContext, useLayoutEffect } from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabList } from "App";
import { UserContext } from "src/context/UserContext/UserContext";

const Stack = createStackNavigator();

type Props = {
  navigation: BottomTabNavigationProp<TabList, "Account">;
};

const AccountScreen = ({ navigation }: Props) => {
  const user = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !!user,
    });
  }, [user]);

  return user ? (
    <ContentWrapper>
      <Text>{`Welcome ${user.email}`}</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </ContentWrapper>
  ) : (
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
