import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { surahProp } from '@/src/app/(user)/prayersTable/Quran/surahs/Surahs'
import { ayahsProp } from '@/src/app/(user)/prayersTable/Quran/surahs/[surah_id]'
import { Divider, Icon } from 'react-native-paper'
type RenderBookmarkAyahsProp = {
    surah_number : number,
    ayah_number : number
}
const RenderBookmarkAyahs = ({ surah_number , ayah_number } : RenderBookmarkAyahsProp) => {
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
      <View className='bg-[#0d509D] mt-2 w-[95%]' style={{ borderRadius : 10 }}>
          <View className='flex-row justify-between items-center px-3'>
              <View className='flex-col'>
                  <Text className='text-white font-semibold'>Surah: {englishSurah?.englishName} </Text>
                  <Text className='text-white font-semibold'>Ayah ({ayah_number})</Text>
              </View>
              <View className='flex-row '> 
                   <Icon source={"share-variant"} color='black' size={25}/>
                  <Icon source={"bookmark"} color='#e5cea2' size={25}/>
              </View>
          </View>
          <Divider />
          <View className='flex-col px-3'>
              <Text className='text-right text-white'>{ayah_number}</Text>
              <Text className='text-right text-white'>{ayah}</Text>
              <Text className='text-left text-white'>{englishAyah}</Text>
          </View>
      </View>
    )
}

export default RenderBookmarkAyahs