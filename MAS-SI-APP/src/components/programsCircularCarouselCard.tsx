import { View, Text, TouchableOpacity,  Image, useWindowDimensions} from 'react-native'
import React from 'react'
import { Program } from '../types'
import { defaultProgramImage } from './ProgramsListProgram'
import {SharedValue, interpolate, useAnimatedStyle} from "react-native-reanimated"
import Animated from 'react-native-reanimated'
type ProgramsCircularCarouselCardProp = {
    program : Program,
}


export default function ProgramsCircularCarouselCard( {program}: ProgramsCircularCarouselCardProp) {
    const {width : windowWidth} = useWindowDimensions();
    const listItemWidth = windowWidth/3;
    
  return (
    <View style={{width : windowWidth, aspectRatio:1}}>
    <TouchableOpacity style={{flex:1}} className='border'> 
        <Image 
        source={ {uri: program.programImg || defaultProgramImage} }
        style={{width:"100%", height:"100%" }}
        />
    </TouchableOpacity>
    </View>
  )
}