import { View, Text, TouchableOpacity,  Image, useWindowDimensions, Animated} from 'react-native'
import React, {useRef}from 'react'
import { Program } from '../types'
import { defaultProgramImage } from './ProgramsListProgram'
type ProgramsCircularCarouselCardProp = {
    program : Program,
    index : number,
    listItemWidth : number,
    itemSpacer : number,
    lastIndex: number,
    scrollX : Animated.Value,
}


export default function ProgramsCircularCarouselCard( {program, index, listItemWidth, scrollX, itemSpacer, lastIndex}: ProgramsCircularCarouselCardProp) {
    const {width : windowWidth} = useWindowDimensions();
    const SPACEING = 10;
    const inputRange = [
      (index  - 1) * listItemWidth,
      index * listItemWidth,
      (index + 1) * listItemWidth
    ]
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -20, 0]
    })
  
  if (index == 0) {
   return <>
   <View style={{width: itemSpacer}}/>
    <View style={{width : listItemWidth, height: 400}}>
      <TouchableOpacity style={{flex:1}} className=''>
        <Animated.View style={{marginHorizontal:SPACEING, padding: SPACEING * 2 , alignItems: "center", transform: [{ translateY }]}}>
          <Image 
          source={ {uri: program.programImg || defaultProgramImage} }
          style={{width:"100%", height:"75%", borderRadius: 20  }}
          />
          <Text>{program.programDesc}</Text>
      </Animated.View> 
      </TouchableOpacity>
      </View>
   </>
  }  

  if (index == lastIndex - 1){
    return <>
    <View style={{width : listItemWidth, height: 400}}>
      <TouchableOpacity style={{flex:1}} className=''>
        <Animated.View style={{marginHorizontal:SPACEING, padding: SPACEING * 2 , alignItems: "center", transform: [{ translateY }]}}>
          <Image 
          source={ {uri: program.programImg || defaultProgramImage} }
          style={{width:"100%", height:"75%", borderRadius: 20  }}
          />
          <Text>{program.programDesc}</Text>
      </Animated.View> 
      </TouchableOpacity>
      </View>
    <View style={{width: itemSpacer}}/>
   </>
  }
  return (
    <View style={{width : listItemWidth, height: 400}}>
    <TouchableOpacity style={{flex:1}} className=''>
      <Animated.View style={{marginHorizontal:SPACEING, padding: SPACEING * 2 , alignItems: "center", transform: [{ translateY }]}}>
        <Image 
        source={ {uri: program.programImg || defaultProgramImage} }
        style={{width:"100%", height:"75%", borderRadius: 20 }}
        />
        <Text>{program.programDesc}</Text>
     </Animated.View> 
    </TouchableOpacity>
    </View>
  )
}