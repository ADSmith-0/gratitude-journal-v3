/* eslint-disable react/no-unstable-nested-components */
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { List, Menu, Plus, User2 } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsButton from "src/components/Navigation/SettingsButton";
import Button from "src/components/UI/Button";
import DateContextProvider from "src/context/DateContext/DateContextProvider";
import UserContextProvider from "src/context/UserContext/UserContextProvider";
import useLocalStorage from "src/hooks/useLocalStorage";
import AccountScreen from "src/screens/AccountScreen";
import AddScreen from "src/screens/AddScreen";
import CalendarScreen from "src/screens/CalendarScreen";
import EntriesScreen from "src/screens/EntriesScreen";
import SettingsScreen from "src/screens/SettingsScreen";
import { colours, fontSize, spacing } from "src/styles";
import DateProcessor from "src/utils/DateProcessor";

export type TabList = {
  Add: undefined;
  Entries: undefined;
  Account: undefined;
};

const Drawer = createDrawerNavigator<TabList>();

const Tabs = () => (
  <Drawer.Navigator
    initialRouteName="Add"
    screenOptions={({ navigation }) => ({
      drawerActiveTintColor: colours.primary[100],
      drawerInactiveTintColor: colours.primary[500],
      drawerHideOnKeyboard: true,
      drawerActiveBackgroundColor: colours.primary[900],
      drawerIconStyle: {
        marginTop: spacing[3],
      },
      drawerLabelStyle: {
        fontSize: fontSize.m,
      },
      headerRight: () => <SettingsButton />,
      headerLeft: () => (
        <Button
          variant="tertiary"
          onPress={navigation.toggleDrawer}
          icon={() => <Menu color={colours.grey[100]} fontSize={fontSize.l} />}
        />
      ),
    })}>
    <Drawer.Screen
      name="Add"
      component={AddScreen}
      options={{
        drawerIcon: ({ color, size }: { color: any; size: number }) => (
          <Plus color={color} size={size / 1.3} />
        ),
      }}
    />
    <Drawer.Screen
      name="Entries"
      component={EntriesScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <List color={color} size={size / 1.2} />
        ),
      }}
    />
    <Drawer.Screen
      name="Account"
      component={AccountScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <User2 color={color} size={size / 1.2} />
        ),
      }}
    />
  </Drawer.Navigator>
);

const Stack = createStackNavigator<{
  Tabs: undefined;
  Settings: undefined;
  Calendar: undefined;
}>();

const App = () => {
  const [reminderConfig, setReminderConfig] =
    useLocalStorage("reminder-config");

  if (!reminderConfig?.time) {
    const dateProcessor = new DateProcessor();
    dateProcessor.date.setHours(9, 0, 0);
    setReminderConfig(prevConfig => ({
      ...prevConfig,
      time: dateProcessor.date,
    }));
  }

  return (
    <SafeAreaProvider>
      <DateContextProvider>
        <UserContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                cardStyle: { backgroundColor: colours.offWhite },
              }}>
              <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Calendar" component={CalendarScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserContextProvider>
      </DateContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
