import { View, Text, TouchableOpacity,  Image, useWindowDimensions} from 'react-native'
import React from 'react'
import { Program } from '../types'
import { defaultProgramImage } from './ProgramsListProgram'
import {SharedValue, interpolate, useAnimatedStyle} from "react-native-reanimated"
import Animated from 'react-native-reanimated'
type ProgramsCircularCarouselCardProp = {
    program : Program,
    index : number
    contentOffset : SharedValue<number>
}


export default function ProgramsCircularCarouselCard( {program, index,  contentOffset} : ProgramsCircularCarouselCardProp) {
    const {width : windowWidth} = useWindowDimensions();
    const listItemWidth = windowWidth/3;

    const rStyle = useAnimatedStyle( () => {
        const inputRange = [
            (index - 1 ) * listItemWidth,
            index * listItemWidth,
            (index + 1) * listItemWidth
        ]
        const outputRange = [ 0, -listItemWidth / 2, 0 ]
        const translateY = interpolate(
            contentOffset.value,
            inputRange,
            outputRange
        )

        return{
            transform : [
                {translateY: translateY},
                {translateX: listItemWidth / 2 + listItemWidth }
            ]
        }
    })

    
  return (
    <Animated.View style={[{width : listItemWidth, aspectRatio:1}, rStyle]}>
    <TouchableOpacity style={{flex:1}} className='border'> 
        <Image 
        source={ {uri: program.programImg || defaultProgramImage} }
        style={{flex:1, borderRadius: 20}}
        />
    </TouchableOpacity>
    </Animated.View>
  )
}