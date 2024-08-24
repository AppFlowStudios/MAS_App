import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated'
import { Icon } from 'react-native-paper'
import * as Haptics from 'expo-haptics'
type BusinessAdsLocationCardProp = {
    height : number
    width : number
    index : number
    location : string
    setSelectedLocation : ( duration : string[] ) => void
    selectedLocation : string[]
}


const BusinessAdsLocationCard = ({ height, width, index, location, setSelectedLocation, selectedLocation } : BusinessAdsLocationCardProp) => {
  const scale = useSharedValue(1)
  const [ checked , setChecked ] = useState(false)
  const handlePress = () => {
    scale.value = withSequence(withSpring(0.9), withSpring(1))
    
    Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
    if( selectedLocation.includes(location) ){
      const newLocation = selectedLocation.filter(curr => curr != location)
      setSelectedLocation(newLocation)
      setChecked( false )
    }   
    else if( selectedLocation ){
      setSelectedLocation([location])
      setChecked(true)
    }
  }
  const cardStyle = useAnimatedStyle(() => {
    return{
        transform: [{ scale : scale.value }]
    }
  })
  useEffect(() => {
    if( selectedLocation[0] != location ){
      setChecked(false)
    } 
  }, [selectedLocation])
  return (
    <Animated.View style={[{ height : height, width : width, borderRadius : 20, shadowColor : "black", shadowOpacity : 1, shadowRadius : 1, shadowOffset : {width : 0, height : 0} }, cardStyle, {marginTop : index === 0 ? 10: 0}, {marginBottom : index === 5 ? 10 : 0}]}>
        <Pressable onPress={handlePress} style={[{ height : height, width : width, flexDirection : "row", alignItems : "center", justifyContent : "center"  }]}>
          {checked ?    <Icon source={"checkbox-blank-circle"}  size={25}/>  : <Icon source={"checkbox-blank-circle-outline"}  size={25}/>}
            <View className='w-[5]'/>
            <View style={{ backgroundColor : "#D3D3D3", height : height, width : width, borderRadius : 10,  paddingVertical : 10, paddingHorizontal : 10, alignItems : 'center', justifyContent : 'center'}}>
            <Text className='text-2xl'>{location}</Text>
          </View>
        </Pressable>
    </Animated.View>
  )
}

export default BusinessAdsLocationCard