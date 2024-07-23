import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { surahProp } from '@/src/app/(user)/prayersTable/Quran/surahs/Surahs'
import { Link } from 'expo-router'
import { Divider, Icon } from 'react-native-paper'
import { useAuth } from '@/src/providers/AuthProvider'
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolation, runOnJS} from 'react-native-reanimated'
import * as Haptics from "expo-haptics"
import { supabase } from '@/src/lib/supabase'
type RenderBookmarkSurahsProp = {
    surah_number : number
}
const RenderBookmarkSurahs = ( { surah_number  } : RenderBookmarkSurahsProp) => {
    const [ surah, setSurah ] = useState<surahProp>()
    const getSurah = async ()  => {
      const url = `https://api.alquran.cloud/v1/surah/${surah_number}`
      const response = await fetch(url)
      if ( !response.ok ){
          alert(response.statusText)
      }
  
      const data = await response.json()
      if ( data ){
          setSurah(data.data)
      }
    }
    const { session } = useAuth()
    const liked = useSharedValue(1)
  
  
  
    
    async function stateOfLikedLecture(){
      if( liked.value == 0 ){
      const { error } = await supabase.from("user_bookmarked_surahs").insert({user_id : session?.user.id, surah_number : surah_number})
      if (error) {
        console.log(error)
      }
      }
      if ( liked.value == 1 ){
        const { error } = await supabase.from("user_bookmarked_surahs").delete().eq("user_id", session?.user.id).eq("surah_number", surah_number)
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
  
    const BookmarkButton = () => {
      return(
        <Pressable onPress={stateOfLikedLecture} className=' relative'>
          <Animated.View style={outlineStyle}>
            <Icon source="bookmark-outline"  color='black'size={25}/>
          </Animated.View>
          <Animated.View style={[{position: "absolute"} ,fillStyle]}>
            <Icon source="bookmark"  color='#e5cea2'size={25}/>
          </Animated.View>
      </Pressable>
      )
    }
    useEffect(() => {
      getSurah()
    }, [])
    return (
      <Link href={`/prayersTable/Quran/surahs/${surah_number}`} asChild>
          <Pressable className='flex-row bg-[#0d509D] items-center w-[95%] mt-1' style={{ borderRadius : 10}} >
            <View className='flex-col w-[60%] items-center'>
                <View className='flex-row items-center'>
                    <Text className='text-white font-bold'>{surah_number}    </Text>
                    <Text className='text-white font-bold' >{surah?.name}</Text>
                </View>
                <View className='flex-col items-center'>
                    <Text className='text-white'>{surah?.englishName} ({surah?.englishNameTranslation})</Text>
                    <Text className='text-white'>Type of Surah: {surah?.revelationType}</Text>
                </View>
            </View>
            <View className='w-[40%] items-center'>
                <BookmarkButton />
            </View>
              <Divider  />
          </Pressable>
      </Link>
    )
}

export default RenderBookmarkSurahs