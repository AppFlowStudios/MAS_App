import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from "expo-router";
import  HomeScreen  from "./menu/index";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}
const Tab = createBottomTabNavigator();


export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen 
        name="program"
        options={ {
          title: "Programs",
          headerShown:  false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='book' color={color} />

          ),
        }}
        />

    </Tabs>
  );
}
