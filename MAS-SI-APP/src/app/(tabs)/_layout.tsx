import { Tabs,Redirect } from 'expo-router';
import { View, Image, Text } from "react-native";
import { TabBarIcon } from '../../components/navigation/TabBarIcon';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import  HomeScreen  from "./index";
import Programs from "./programs" ;

const Tab = createBottomTabNavigator();


export default function TabLayout() {
  return (
    <Tab.Navigator screenOptions={
      {headerShown: false}
    }>
      <Tab.Screen  name="Home" component={HomeScreen}  />
      <Tab.Screen name="Programs" component={Programs} />
    </Tab.Navigator>
  );
}
