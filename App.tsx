/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { List, Plus, User2 } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsButton from "src/components/Navigation/SettingsButton";
import DateContextProvider from "src/context/DateContext/DateContextProvider";
import useLocalStorage from "src/hooks/useLocalStorage";
import AccountScreen from "src/screens/AccountScreen";
import AddScreen from "src/screens/AddScreen";
import CalendarScreen from "src/screens/CalendarScreen";
import EntriesScreen from "src/screens/EntriesScreen";
import SettingsScreen from "src/screens/SettingsScreen";
import { colours, dimensions, fontSize, spacing } from "src/styles";
import DateProcessor from "src/utils/DateProcessor";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    sceneContainerStyle={{
      backgroundColor: colours.offWhite,
    }}
    screenOptions={() => ({
      tabBarActiveTintColor: colours.primary[100],
      tabBarInactiveTintColor: colours.primary[500],
      tabBarHideOnKeyboard: true,
      tabBarActiveBackgroundColor: colours.primary[900],
      tabBarStyle: {
        height: dimensions[3],
      },
      tabBarIconStyle: {
        marginTop: spacing[3],
      },
      tabBarLabelStyle: {
        fontSize: fontSize.s,
        paddingBottom: spacing[6],
      },
      headerRight: () => <SettingsButton />,
    })}>
    <Tab.Screen
      name="Add"
      component={AddScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Plus color={color} size={size / 1.3} />
        ),
      }}
    />
    <Tab.Screen
      name="Entries"
      component={EntriesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <List color={color} size={size / 1.2} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <User2 color={color} size={size / 1.2} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator<{
  Tabs: undefined;
  Settings: undefined;
  Calendar: undefined;
}>();

const App = () => {
  const [reminderConfig, setReminderConfig] =
    useLocalStorage("reminder-config");
  if (!reminderConfig.time) {
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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: colours.offWhite },
              }}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DateContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
