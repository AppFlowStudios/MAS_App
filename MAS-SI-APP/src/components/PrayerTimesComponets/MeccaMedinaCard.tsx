import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Icon } from 'react-native-paper'
type MeccaMedinaCardProp = {
    meccaMedina : string,
    meccaMedinaDesc : string
}
const MeccaMedinaCard = ({ meccaMedina, meccaMedinaDesc } : MeccaMedinaCardProp) => {
  const [ opened, setOpened ] = useState(false)
  const onItemPress = () => {
    setOpened(!opened)
  }
  
  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = opened ? withTiming(100) : withTiming(0);
    return{
        height: animatedHeight
    }
  })

  return (
    <View className='px-3'>
      <View className='h-[50] justify-center items-center'>
        <Pressable className='items-center justify-between w-[100%]  flex-row' onPress={onItemPress}>
            <Text className='text-xl font-bold text-white'>What is a Meccan Surah?</Text>
            <View style={{ transform : opened ? [{rotate : '90deg'}]  : "" }}>
              <Icon source={"chevron-right"} color='white' size={20} />
            </View>
        </Pressable>
      </View>
        <Animated.View style={[animatedStyle]}>
            <Text>
                {meccaMedinaDesc}
            </Text>
        </Animated.View>
    </View>
  )
}

export default MeccaMedinaCard