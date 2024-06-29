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
      <Pressable style={{backgroundColor : "white", justifyContent: "center" , alignItems : "center", borderRadius: 15}}>
        <Image 
        source={{uri : program.programImg || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBoYwr8T3VA5KoqPVyY1P1egA1d4BDpi-PA&s"}}
        style={{width: "85%", height: "80%", resizeMode: "cover", borderRadius : 15}} />
        <Text className='text-center'>{program.programDesc}</Text>
      </Pressable>
      </Link>
    </Animated.View>
    )
  }
  if ( index == lastIndex - 1 ){
    return(
    <Animated.View style={[{width: listItemWidth, marginLeft: spacing, marginRight: itemSpacer}, cardStyle]} className=''>
        <Link href={"../menu/program/programsAndEventsScreen/"} asChild>
        <Pressable style={{backgroundColor : "white", justifyContent: "center" , alignItems : "center", borderRadius: 15}}>
          <Image 
          source={{uri : program.programImg || "https://ugc.production.linktr.ee/e3KxJRUJTu2zELiw7FCf_hH45sO9R0guiKEY2?io=true&size=avatar-v3_0"}}
          style={{width: "85%", height: "80%", resizeMode: "cover", borderRadius: 15}} 
          />
          <Text>{program.programDesc}</Text>
        </Pressable>
        </Link>
      </Animated.View>
    )
  }
  return (
    <Animated.View style={[{width: listItemWidth, marginLeft: spacing, marginRight: spacing}, cardStyle]} className=''>
      <Link href={"../menu/program/programsAndEventsScreen/"} asChild>
      <Pressable style={{backgroundColor : "white", justifyContent: "center" , alignItems : "center", borderRadius: 15}}>
        <Image 
        source={{uri : program.programImg || "https://ugc.production.linktr.ee/e3KxJRUJTu2zELiw7FCf_hH45sO9R0guiKEY2?io=true&size=avatar-v3_0"}}
        style={{width: "90%", height: "90%", resizeMode: "contain"}} />
        <Text className='text-center'>{program.programDesc}</Text>
      </Pressable>
      </Link>
    </Animated.View>
  )
}