import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import RenderAyah from '@/src/components/PrayerTimesComponets/RenderAyah'
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
  const [ ayahs, setAyahs ] = useState<ayahsProp[] | null>()
  const [ ayahsEnglish, setAyahsEnglish ] = useState()
  const getAyahs = async () => {
    const ayahURL = `https://api.alquran.cloud/v1/surah/${surah_id}/quran-uthmani`
    const response = await fetch(ayahURL)
    if( !response.ok ){
        console.log( response.status )
    }

    const data = await response.json()
    if( data ){
        setAyahs(data.data.ayahs)
    }
  }

  useEffect(() => {
    getAyahs()
  }, [])
  return (
    <ScrollView>
       <View>
        {
            ayahs ? ayahs.map((item, index) => {
                return <RenderAyah ayah={item} index={index} />
            })
            : <></>
        }
      </View> 
    </ScrollView>
  )
}

export default Ayats