import { View, Text, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import RenderAyah from '@/src/components/PrayerTimesComponets/RenderAyah'
import { ActivityIndicator } from 'react-native-paper'
export type ayahsProp = {
     number : number
     text : string
    numberInSurah : number
    jusz : number,
    manzil : number,
    page : number,
    ruku : number,
    hizbQuarter: number,
    sajda: boolean
}
const Ayats = () => {
  const { surah_id } = useLocalSearchParams()
  const [ loading, setLoading ] = useState(true)
  const [ ayahs, setAyahs ] = useState<ayahsProp[] | null>()
  const [ ayahsEnglish, setAyahsEnglish ] = useState<ayahsProp[] | null>()
  const getAyahs = async () => {
    const ayahURL = `https://api.alquran.cloud/v1/surah/${surah_id}/quran-uthmani`
    const ayahEnglishURL = `https://api.alquran.cloud/v1/surah/${surah_id}/en.asad`
    const response = await fetch(ayahURL)
    if( !response.ok ){
        console.log( response.status )
    }
    const englishResponse = await fetch(ayahEnglishURL)
    if( ! englishResponse.ok ){
        console.log( englishResponse.status )
    }
    const data = await response.json()
    if( data ){
        setAyahs(data.data.ayahs)
    }

    const englishData = await englishResponse.json()
    if ( englishData ){
        setAyahsEnglish(englishData.data.ayahs)
    }
    setLoading(false)
  }

  useEffect(() => {
    getAyahs()
  }, [])
  
  if ( !ayahs || !ayahsEnglish || loading ){
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <ActivityIndicator />
      </>
    )
  }
  return (
    <ScrollView className='bg-white flex-1'>
        <Stack.Screen options={{ title : ""  }} />
       <View>
        {
            
            ayahs ? ayahs.map((item, index) => {
                return (
                <View key={index}>
                    <RenderAyah ayah={item} english={ayahsEnglish[index]} index={index} surah_id={surah_id}/>
                </View>
                )
            })
            : <></>
        }
      </View> 
    </ScrollView>
  )
}

export default Ayats