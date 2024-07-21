import { View, Text, Pressable, LayoutChangeEvent } from 'react-native'
import React, { useState } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
export type AnimatedTabBarProp = {
    title : string
}

type AnimatedTabProp = {
    animatedTabs : AnimatedTabBarProp[],
    selectedTab : number,
    setSelectedTab : (index : number) => void
}
const AnimatedTabBar = ({ animatedTabs, selectedTab, setSelectedTab } : AnimatedTabProp) => {
  const [ dimensions, setDimensions ] = useState( {height : 20, width: 100} )
  const buttonWidth = dimensions.width / animatedTabs.length
  const tabPositonX = useSharedValue(0)

  const onTabBarLayout = (e : LayoutChangeEvent) => {
    setDimensions({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width
    })
  }

  const handlePress = ( index : number ) => {
    setSelectedTab(index)
  }
  const onTabPress = ( index : number) => {
    tabPositonX.value = withTiming(buttonWidth * index, {}, () => runOnJS(handlePress)(index)
    )
  }

  const animatedStyle = useAnimatedStyle(() => {
    return{
        transform: [{ translateX: tabPositonX.value }]
    }
  })
  return (
    <View className='bg-white justify-center' style={{ borderRadius: 20}}>
     <Animated.View className='bg-[#e5cea2]' style={[ animatedStyle, { height: dimensions.height - 10, width: buttonWidth - 10, position : 'absolute', marginHorizontal: 5, borderRadius: 20 }]}/>
        <View onLayout={onTabBarLayout} className='flex-row'>
            {animatedTabs.map((tab, index) => {
                const color = selectedTab === index ? "white" : "black"
            return (
                    <Pressable key={index} style={{ flex : 1, paddingVertical : 20 }} onPress={() => onTabPress(index)}>
                        <Text style={{ color: color, alignSelf : "center", fontWeight: "bold", fontSize: 14 }}>{tab.title}</Text>
                    </Pressable>
                )
            })}
        </View>
    </View>
  )
}

export default AnimatedTabBar