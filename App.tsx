/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { List, Plus, User2 } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateContextProvider from "./src/context/DateContext/DateContextProvider";
import AccountScreen from "./src/screens/AccountScreen";
import AddScreen from "./src/screens/AddScreen";
import EntriesScreen from "./src/screens/EntriesScreen";
import { colours, dimensions, fontSize, spacing } from "./src/styles";

const Tab = createBottomTabNavigator();

const App = () => (
  <SafeAreaProvider>
    <DateContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{
            backgroundColor: colours.grey[900],
          }}
          screenOptions={{
            tabBarActiveTintColor: colours.primary[100],
            tabBarHideOnKeyboard: true,
            tabBarActiveBackgroundColor: colours.primary[800],
            tabBarStyle: {
              height: dimensions[2],
            },
            tabBarIconStyle: {
              marginTop: spacing[3],
            },
            tabBarLabelStyle: {
              fontSize: fontSize.s,
              paddingBottom: spacing[3],
            },
          }}>
          <Tab.Screen
            name="Add"
            component={AddScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Plus color={color} size={size / 1.2} />
              ),
            }}
          />
          <Tab.Screen
            name="Entries"
            component={EntriesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <List color={color} size={size / 1.1} />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <User2 color={color} size={size / 1.1} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </DateContextProvider>
  </SafeAreaProvider>
);

export default App;
