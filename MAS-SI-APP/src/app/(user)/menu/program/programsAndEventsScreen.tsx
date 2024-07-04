import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProgramsScreen from './allPrograms';
import Lectures from './lectures/[lectureID]';
import Event from './Event';
import { View } from 'react-native';
import { withLayoutContext } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import programsData from '@/assets/data/programsData';
import * as Animatable from 'react-native-animatable';

const Tabs  = createMaterialTopTabNavigator();

const ProgramsAndEventsScreen = () => {
  return (
        <Tabs.Navigator
          screenOptions={{
            tabBarStyle : {paddingTop : "12%",backgroundColor: "#0D509D" },
            tabBarIndicatorContainerStyle : {justifyContent: "center", marginLeft: 23},
            tabBarIndicatorStyle: {backgroundColor : "white", width: 150, marginBottom: 4},
            tabBarLabelStyle : {color: "white", backgroundColor: "#57BA47", padding: 5, fontWeight: "bold" },
          }}
        >
          <Tabs.Screen name="Programs/Tarbiya"  component={ProgramsScreen} />
          <Tabs.Screen name="Events" component={Event} />
        </Tabs.Navigator>
  )
}

export default ProgramsAndEventsScreen