import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { surahProp } from '@/src/app/(user)/prayersTable/Quran/surahs/Surahs'
import { ayahsProp } from '@/src/app/(user)/prayersTable/Quran/surahs/[surah_id]'
import { Divider, Icon } from 'react-native-paper'
type RenderLikedAyahsProp = {
    surah_number : number
    ayah_number : number
}

const RenderLikedAyahs = ( { surah_number , ayah_number } : RenderLikedAyahsProp) => {
  const [ surah , setSurah ] = useState<surahProp>()
  const [ ayah , setAyah ] = useState<string>()
  const [ englishSurah, setEnglishSurah ] = useState<surahProp>()
  const [ englishAyah, setEnglishAyah ] = useState<string>()

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
    <View className='bg-white mt-2'>
        <View className='flex-row justify-between items-center'>
            <View className='flex-col'>
                <Text>Surah: {englishSurah?.englishName} </Text>
                <Text>Ayah ({ayah_number})</Text>
            </View>
            <View className='flex-row '> 
                 <Icon source={"share-variant"} color='black' size={25}/>
                <Icon source={"cards-heart"} color='red' size={25}/>
            </View>
        </View>
        <Divider />
        <View className='flex-col'>
            <Text className='text-right'>{ayah_number}</Text>
            <Text className='text-right'>{ayah}</Text>
            <Text className='text-left'>{englishAyah}</Text>
        </View>
    </View>
  )
}

export default RenderLikedAyahs