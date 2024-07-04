import { View, Text, TouchableOpacity,  Image, useWindowDimensions, Pressable} from 'react-native'
import React, {useRef}from 'react';
import { Program } from '../types';
import { defaultProgramImage } from './ProgramsListProgram';
import { Link } from 'expo-router';
import Animated, {interpolate, Extrapolation, useSharedValue, useAnimatedStyle} from "react-native-reanimated";
import { transform } from '@babel/core';
type ProgramsCircularCarouselCardProp = {
    program : Program,
    index : number,
    listItemWidth : number,
    itemSpacer : number,
    lastIndex: number,
    scrollX : number,
    spacing : number
}


export default function ProgramsCircularCarouselCard( {program, index, listItemWidth, scrollX, itemSpacer, spacing, lastIndex}: ProgramsCircularCarouselCardProp) {
    const {width : windowWidth} = useWindowDimensions();
    const size = useSharedValue(0.6);

    const inputRange = [
      (index - 1) * listItemWidth,
      index * listItemWidth,
      (index  + 1) * listItemWidth
    ]
  
    size.value = interpolate(
      scrollX,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP
    )

    const cardStyle = useAnimatedStyle(() =>{
      return{
        transform : [{scaleY : size.value}]
      }
    })

  if ( index == 0 ){
    return (
    <Animated.View style={[{width: listItemWidth, marginLeft: itemSpacer, marginRight: spacing}, cardStyle]} className=''>
      <Link href={"../menu/program/programsAndEventsScreen/"} asChild>
        <Pressable style={{justifyContent: "center" , alignItems : "center"}}>
        <View style={{width: 200 , height: 200, shadowColor: "black", shadowOffset: { width: 0, height: 0},shadowOpacity: 0.6, justifyContent: "center", alignItems: "center", borderRadius: 20}} >
          <Image 
          source={require("@/assets/images/masSummerProgram.png")}
          style={{width: "100%", height: "100%", resizeMode: "stretch", overflow :"hidden", borderRadius: 20}} 
          borderBottomLeftRadius={20}
          />
        </View>
          <Text className='text-center mt-3 font-bold'>{program.programDesc}</Text>
        </Pressable>
      </Link>
    </Animated.View>
    )
  }
  if ( index == lastIndex - 1 ){
    return(
    <Animated.View style={[{width: listItemWidth, marginLeft: spacing, marginRight: itemSpacer}, cardStyle]} className=''>
      <Link href={"../menu/program/programsAndEventsScreen/"} asChild>
      <Pressable style={{justifyContent: "center" , alignItems : "center"}}>
      <View style={{width: 200 , height: 200, shadowColor: "black", shadowOffset: { width: 0, height: 0},shadowOpacity: 0.6, justifyContent: "center", alignItems: "center", borderRadius: 20}} >
        <Image 
        source={require("@/assets/images/masSummerProgram.png")}
        style={{width: "100%", height: "100%", resizeMode: "stretch", overflow :"hidden", borderRadius: 20}} 
        borderBottomLeftRadius={20}
        />
      </View>
        <Text className='text-center mt-3 font-bold'>{program.programDesc}</Text>
      </Pressable>
      </Link>
      </Animated.View>
    )
  }
  return (
    <Animated.View style={[{width: listItemWidth, marginLeft: spacing, marginRight: spacing}, cardStyle]} className=''>
      <Link href={"../menu/program/programsAndEventsScreen/"} asChild>
      <Pressable style={{justifyContent: "center" , alignItems : "center"}}>
      <View style={{width: 200 , height: 200, shadowColor: "black", shadowOffset: { width: 0, height: 0},shadowOpacity: 0.6, justifyContent: "center", alignItems: "center", borderRadius: 20}} >
        <Image 
        source={require("@/assets/images/masSummerProgram.png")}
        style={{width: "100%", height: "100%", resizeMode: "stretch", overflow :"hidden", borderRadius: 20}} 
        borderBottomLeftRadius={20}
        />
      </View>
        <Text className='text-center mt-3 font-bold'>{program.programDesc}</Text>
      </Pressable>
      </Link>
    </Animated.View>
  )
}