import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProgramsScreen from './allPrograms';
import Lectures from './lectures/[lectureID]';
import Event from './Event';
import { View } from 'react-native';
import { withLayoutContext } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import programsData from '@/assets/data/programsData';

const Tabs  = createMaterialTopTabNavigator();

const ProgramsAndEventsScreen = () => {
  return (
        <Tabs.Navigator
          screenOptions={{
            tabBarStyle : {paddingTop : "10%", },
          }}
        >
          <Tabs.Screen name="Programs"  component={ProgramsScreen} />
          <Tabs.Screen name="Events" component={Event} />
        </Tabs.Navigator>
  )
}

export default ProgramsAndEventsScreen