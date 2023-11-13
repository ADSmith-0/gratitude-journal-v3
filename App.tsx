import AccountScreen from "./src/screens/AccountScreen";
import AddScreen from "./src/screens/AddScreen";
import EntriesScreen from "./src/screens/EntriesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { PlusCircle, List, User2 } from "lucide-react-native";
import colours from "./src/colours";

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: colours.grey[100],
          tabBarActiveBackgroundColor: colours.grey[800],
					tabBarStyle: {
						height: 75,
					},
          tabBarItemStyle: {
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 10,
          },
					tabBarIconStyle: {
						marginTop: 7,
					},
					tabBarLabelStyle: {
						fontSize: 15, // TODO Fix later
						paddingBottom: 10,
					},
				}}
			>
				<Tab.Screen
					name="Add"
					component={AddScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<PlusCircle color={color} size={size / 1.2} />
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
	);
};

export default App;
