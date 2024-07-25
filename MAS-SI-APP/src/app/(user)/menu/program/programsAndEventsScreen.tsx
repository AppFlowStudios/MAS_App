import React, { useEffect, useRef } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProgramsScreen from './allPrograms';
import Event from './events/Event';
import Pace from './pace/Pace';
import UpcomingEvents from './upcomingEvents/UpcomingEvents';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, StatusBar, } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate } from 'react-native-reanimated';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TabArrayType } from '@/src/types'
import { withLayoutContext } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import programsData from '@/assets/data/programsData';
import * as Animatable from 'react-native-animatable';

const Tabs  = createMaterialTopTabNavigator();

const animate1 = {0 : {scale: .5, translateY : 0} ,1: {scale: 1.2, translateY: -5}}
const animate2 = {0 : {scale: 1.2, translateY: 0}, 1: {scale: 1, translateY: 20}}

type TabButtonProps = {
  props : BottomTabBarButtonProps,
  items : TabArrayType
}

const TabButton = ({props ,items} : TabButtonProps) => {
  const { onPress, accessibilityState } = props;
  const focused = accessibilityState?.selected
  const viewRef = useRef<any>(null)
  const textRef = useRef<any>(null)

  useEffect(() => {
    if(focused) {
      viewRef.current?.animate(animate1)
      textRef.current.transitionTo({scale: 1})
    }else{
      viewRef.current?.animate(animate2)
      textRef.current.transitionTo({scale: 0})

    }

  }
  , [focused])
  return(
    <TouchableOpacity
    onPress={onPress}
    style={{ alignItems: "center", justifyContent: "center", flex : 1}}
    >
    <Animatable.View ref={viewRef} className='justify-center items-center' style={{width : 30, height: 30, borderRadius: 25, borderWidth: 4, backgroundColor: "white", borderColor: "white", justifyContent: "center", alignItems: "center"}} animation="zoomIn" duration={1000}>
    </Animatable.View>
    <Animatable.Text ref={textRef} style={{fontSize: 14, color: "black", textAlign: "center", paddingTop : 2, fontWeight: "bold"}}>
      {items?.title ? items?.title : "\n"}
    </Animatable.Text>
    </TouchableOpacity>
  )
}

const ProgramsAndEventsScreen = () => {

  const MyTabBar = ({ state, descriptors, navigation, position } : any) => {
    const translateX = useSharedValue(0);
  
  
    const animatedStyle = useAnimatedStyle(() => {
      const width = 100; // assuming each tab has equal width, customize as needed
      return {
        transform: [
          {
            translateX: interpolate(translateX.value, [0, 1], [0, width]),
          },
        ],
      };
    });
  
    return (
      <View style={styles.tabBar}>
        {state.routes.map((route : any, index :number ) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            translateX.value = withTiming(state.index)
            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
            >
              <Text style={styles.tabLabel}>{label}</Text>
            </TouchableOpacity>
          );
        })}
        <Animated.View style={[styles.indicator, animatedStyle]} />
      </View>
    );
  };
  
  return (
        <>
        <StatusBar barStyle={"light-content"}/>
        <Tabs.Navigator 
        screenOptions={{
          tabBarStyle : {paddingTop : "16%",backgroundColor: "#0D509D", },
          tabBarIndicatorContainerStyle : {justifyContent: "center", marginLeft: 25, alignItems: "center"},
          tabBarIndicatorStyle: {backgroundColor : "#57BA47", width: 100, marginBottom: 4},
          tabBarLabelStyle : {color: "white", fontWeight: "bold", textShadowColor: "black", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 0.6},
          tabBarScrollEnabled: true,
          
          }}
        >
          <Tabs.Screen name='Upcoming...' component={UpcomingEvents} />
          <Tabs.Screen name="Programs /Tarbiya"  component={ProgramsScreen} />
          <Tabs.Screen name="Events" component={Event} />
          <Tabs.Screen name="P.A.C.E" component={Pace} />
        </Tabs.Navigator>
        </>
  )
}

{/*  screenOptions={{
            tabBarStyle : {paddingTop : "16%",backgroundColor: "#0D509D", },
            tabBarIndicatorContainerStyle : {justifyContent: "center", marginLeft: 15},
            tabBarIndicatorStyle: {backgroundColor : "#57BA47", width: 100, marginBottom: 4},
            tabBarLabelStyle : {color: "white", fontWeight: "bold", textShadowColor: "black", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 0.6},
            tabBarScrollEnabled: true
          }} */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    
  },
  tabLabel: {
    color: '#000',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    width: 100, // assuming each tab has equal width, customize as needed
    backgroundColor: 'blue',
  },
});

export default ProgramsAndEventsScreen