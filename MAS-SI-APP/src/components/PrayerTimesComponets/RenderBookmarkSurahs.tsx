import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { surahProp } from '@/src/app/(user)/prayersTable/Quran/surahs/Surahs'
import { Link } from 'expo-router'
import { Divider, Icon } from 'react-native-paper'
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
                <Icon source={"bookmark"} color='#e5cea2' size={25} />
            </View>
              <Divider  />
          </Pressable>
      </Link>
    )
}

export default RenderBookmarkSurahs