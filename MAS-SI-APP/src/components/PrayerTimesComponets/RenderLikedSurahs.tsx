import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { surahProp } from '@/src/app/(user)/prayersTable/Quran/surahs/Surahs'
import { Link } from 'expo-router'
import { Divider } from 'react-native-paper'
type RenderLikedSurahsProp = {
    surah_number : number
}
const RenderLikedSurahs = ( { surah_number  } : RenderLikedSurahsProp) => {
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
        <Pressable className='flex-col bg-white' >
            <View className='flex-row'>
                <Text>{surah_number}    </Text>
                <Text>{surah?.name}</Text>
            </View>
            <View>
                <Text>{surah?.englishName} ({surah?.englishNameTranslation})</Text>
                <Text>Type of Surah: {surah?.revelationType}</Text>
            </View>
            <Divider  />
        </Pressable>
    </Link>
  )
}

export default RenderLikedSurahs