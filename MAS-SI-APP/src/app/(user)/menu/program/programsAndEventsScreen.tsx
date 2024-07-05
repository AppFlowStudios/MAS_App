import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProgramsScreen from './allPrograms';
import Event from './events/Event';
import Pace from './pace/Pace';
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
            tabBarStyle : {paddingTop : "16%",backgroundColor: "#0D509D", },
            tabBarIndicatorContainerStyle : {justifyContent: "center", marginLeft: 15},
            tabBarIndicatorStyle: {backgroundColor : "#57BA47", width: 100, marginBottom: 4},
            tabBarLabelStyle : {color: "white", fontWeight: "bold", textShadowColor: "black", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 0.6},
          }}
        >
          <Tabs.Screen name="Programs/Tarbiya"  component={ProgramsScreen} />
          <Tabs.Screen name="Events" component={Event} />
          <Tabs.Screen name="P.A.C.E" component={Pace} />
        </Tabs.Navigator>
  )
}

export default ProgramsAndEventsScreen