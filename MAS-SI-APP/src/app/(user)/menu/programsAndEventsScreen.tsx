import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProgramsScreen from './program/allPrograms';
import Lectures from './program/lectures/[lectureID]';
import Event from './event';
import { View } from 'react-native';
import { withLayoutContext } from 'expo-router';
const Tabs  = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Tabs.Navigator)

const ProgramsAndEventsScreen = () => {
  return (
      <Tabs.Navigator>
        <Tabs.Screen name="Program" component={ProgramsScreen} />
        <Tabs.Screen name="Event" component={Event} />
      </Tabs.Navigator>
  )
}

export default ProgramsAndEventsScreen