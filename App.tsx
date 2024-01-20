/* eslint-disable react/no-unstable-nested-components */
import notifee from "@notifee/react-native";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { List, Plus, User2 } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateContextProvider from "src/context/DateContext/DateContextProvider";
import useOnMount from "src/hooks/useOnMount";
import AccountScreen from "src/screens/AccountScreen";
import AddScreen from "src/screens/AddScreen";
import CalendarScreen from "src/screens/CalendarScreen";
import EntriesScreen from "src/screens/EntriesScreen";

import { colours, dimensions, fontSize, spacing } from "src/styles";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    sceneContainerStyle={{
      backgroundColor: colours.offWhite,
    }}
    screenOptions={{
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
    }}>
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
        tabBarIcon: ({ color, size }) => (
          <User2 color={color} size={size / 1.2} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator<{ Tabs: undefined; Calendar: undefined }>();

const App = () => {
  useOnMount(() => {
    // TODO: Add icon to notifications
    // TODO: Figure out how to send them at a certain time
    // TODO: Maybe make it so that the user can control the time?
    messaging().setBackgroundMessageHandler(
      (message: FirebaseMessagingTypes.RemoteMessage) =>
        notifee.displayNotification(
          JSON.parse(message.data?.notifee as string),
        ),
    );
  });

  return (
    <SafeAreaProvider>
      <DateContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{ cardStyle: { backgroundColor: colours.offWhite } }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DateContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
