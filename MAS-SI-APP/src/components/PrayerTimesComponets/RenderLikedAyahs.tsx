import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { surahProp } from '@/src/app/(user)/prayersTable/Quran/surahs/Surahs'
import { ayahsProp } from '@/src/app/(user)/prayersTable/Quran/surahs/[surah_id]'
import { Divider, Icon } from 'react-native-paper'
import { useAuth } from '@/src/providers/AuthProvider'
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, runOnJS} from 'react-native-reanimated'
import * as Haptics from "expo-haptics"
import { supabase } from '@/src/lib/supabase'
type RenderLikedAyahsProp = {
    surah_number : number
    ayah_number : number
}

const RenderLikedAyahs = ( { surah_number , ayah_number } : RenderLikedAyahsProp) => {
  const [ surah , setSurah ] = useState<surahProp>()
  const [ ayah , setAyah ] = useState<string>()
  const [ englishSurah, setEnglishSurah ] = useState<surahProp>()
  const [ englishAyah, setEnglishAyah ] = useState<string>()
 
  const { session } = useAuth()
  const liked = useSharedValue(1)



  
  async function stateOfLikedLecture(){
    if( liked.value == 0 ){
    const { error } = await supabase.from("user_liked_ayahs").insert({user_id : session?.user.id, surah_number : surah_number, ayah_number : ayah_number})
    if (error) {
      console.log(error)
    }
    }
    if ( liked.value == 1 ){
      const { error } = await supabase.from("user_liked_ayahs").delete().eq("user_id", session?.user.id).eq("surah_number", surah_number).eq("ayah_number" , ayah_number)
      if (error) {
        console.log(error)
      }
    }
    liked.value = withSpring( liked.value ? 0: 1 )
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
  }

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolation.CLAMP),
        },
      ],
    };
  });
  
  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value
    };
  });

  const LikeButton = () => {
    return(
      <Pressable onPress={stateOfLikedLecture} className=' relative'>
        <Animated.View style={outlineStyle}>
          <Icon source="cards-heart-outline"  color='black'size={25}/>
        </Animated.View>
        <Animated.View style={[{position: "absolute"} ,fillStyle]}>
          <Icon source="cards-heart"  color='#e5cea2'size={25}/>
        </Animated.View>
    </Pressable>
    )
  }

  const getInfo = async () => {
    const url = `https://api.alquran.cloud/v1/ayah/${surah_number}:${ayah_number}/quran-uthmani`
    const englishURL = `https://api.alquran.cloud/v1/ayah/${surah_number}:${ayah_number}/en.asad`
    const response = await fetch(url)
    const englishResponse = await fetch(englishURL)
    if( !response.ok ){
        alert( response.statusText )
    }
    if( !englishResponse.ok ){
        alert( englishResponse.statusText)
    }
    const data = await response.json()
    const englishData = await englishResponse.json()
    if( data ){
        setSurah(data.data.surah)
        setAyah(data.data.text)
    }
    if( englishData ){
        setEnglishSurah(englishData.data.surah)
        setEnglishAyah(englishData.data.text)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])
  return (
    <View className='bg-[#0d509D] mt-2 w-[95%]' style={{ borderRadius :10 }}>
        <View className='flex-row justify-between items-center px-3 mt-1'>
            <View className='flex-col'>
                <Text className='text-white font-bold'>Surah: {englishSurah?.englishName} </Text>
                <Text className='text-white font-bold'>Ayah ({ayah_number})</Text>
            </View>
            <View className='flex-row '> 
                 <Icon source={"share-variant"} color='black' size={25}/>
                 <View className='px-1'/>
                <LikeButton />
            </View>
        </View>
        <Divider />
        <View className='flex-col px-3 py-2'>
            <Text className='text-right text-white'>{ayah_number}</Text>
            <Text className='text-right text-white'>{ayah}</Text>
            <Text className='text-left text-white'>{englishAyah}</Text>
        </View>
    </View>
  )
}

export default RenderLikedAyahs