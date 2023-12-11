/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { CalendarDays, List, Plus, User2 } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateContextProvider from "src/context/DateContext/DateContextProvider";
import AccountScreen from "src/screens/AccountScreen";
import AddScreen from "src/screens/AddScreen";
import CalendarScreen from "src/screens/CalendarScreen";
import EntriesScreen from "src/screens/EntriesScreen";
import { colours, dimensions, fontSize, spacing } from "src/styles";

const Tab = createBottomTabNavigator();

const App = () => (
  <SafeAreaProvider>
    <DateContextProvider>
      <NavigationContainer>
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
            name="Calendar"
            component={CalendarScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <CalendarDays color={color} size={size / 1.2} />
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
      </NavigationContainer>
    </DateContextProvider>
  </SafeAreaProvider>
);

export default App;
