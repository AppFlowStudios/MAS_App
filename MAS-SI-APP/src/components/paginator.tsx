import { View,  StyleSheet, Animated, useWindowDimensions } from 'react-native'
import React from 'react'
import { Program, gettingPrayerData } from '../types'
import { Extrapolation } from 'react-native-reanimated'
type paginatorProp = {
    data : gettingPrayerData[],
    scrollx: any
}
export default function Paginator( {data, scrollx} : paginatorProp ) {
    const { width } = useWindowDimensions();
  return (
    <View className='flex-row h-64 w-[50%] m-auto'>
      { data.map( (_,i) =>{
        const inputRange = [ (i - 1) * width, i * width, (i + 1) * width ];
        const dotWidth = scrollx.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            
        })
        const opacity = scrollx.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp"
        })
        return <Animated.View style={[ styles.dot ,{width : dotWidth, opacity}]} key={i.toString()}/>
      }) }
    </View>
  )
}

const styles = StyleSheet.create({
    dot : {
        height: 6,
        borderRadius: 3,
        backgroundColor: "black",
        marginHorizontal: 8
    }
})
