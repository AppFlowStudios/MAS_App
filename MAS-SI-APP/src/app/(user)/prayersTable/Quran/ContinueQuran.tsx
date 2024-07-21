import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Surahs from './surahs/Surahs'
import { Divider, Icon } from 'react-native-paper'
import { Link } from 'expo-router'
import {BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import MeccaMedinaCard from '@/src/components/PrayerTimesComponets/MeccaMedinaCard'

const ContinueQuran = () => {
    const [ loading,  setLoading ] = useState(true)
    const [ quran, setQuran ] = useState()
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = () => bottomSheetRef.current?.present();
    const fetchQuran = async () => {
      setLoading(true)
      const url = "https://api.alquran.cloud/v1/quran/en.asad"
      try{
          const response = await fetch(url)
          if( !response.ok ){
              throw new Error(`Response status: ${response.status}`);
          }
  
          const json = await response.json();
          setQuran(json)
          setLoading(false)
      }
      catch ( error ){
          console.log(error)
      }
    }
  
    useEffect(() => {
      fetchQuran()
    }, [])  
  return (
    <ScrollView className='bg-white flex-1'>
        <View className='flex-col'>
            <Text className='text-2xl font-bold'> Juz</Text>
            
        </View>
        
        <Text className='text-2xl font-bold ml-3'> Surah</Text>
        <View className='items-center justify-center bg-white'>
             <View style={{backgroundColor: "white", shadowColor : "black", shadowOffset : {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 1, width: "95%", borderRadius: 10, }} className=''>
                    <Link href={"prayersTable/Quran/surahs/1"} asChild>
                    <Pressable className='flex-row bg-[#0D509D]' style={{ borderTopLeftRadius: 10, borderTopRightRadius : 10}}>
                    <View className='w-[50] h-[50] items-center justify-center'>
                            <Text className='text-xl font-bold text-white'>1</Text>
                    </View>
                    <View className='flex-col items-center justify-center w-[50%] b'>
                            <Text className='text-xl font-bold text-white'>Al-Faatiha</Text>
                            <Text className='text-xl font-bold text-white'>7 ayah Meccan</Text>
                    </View>
                    <View className='items-center justify-center w-[40%]' >
                            <Text className='text-xl font-bold text-white'>سُورَةُ ٱلْفَاتِحَةِ</Text>
                    </View>
                    </Pressable>
                    </Link>
                    <Divider />
                    <Link href={"prayersTable/Quran/surahs/2"} asChild>
                    <Pressable className='flex-row bg-[#0D509D] '>
                        <View className='w-[50] h-[50] items-center justify-center'>
                                <Text className='text-xl font-bold text-white'>2</Text>
                        </View>
                        <View className='flex-col items-center justify-center w-[50%]'>
                                <Text className='text-xl font-bold text-white'>Al-Baqara</Text>
                                <Text className='text-xl font-bold text-white'>286 ayah Medinan</Text>
                        </View>
                        <View className='items-center justify-center w-[40%]'>
                                <Text className='text-xl font-bold text-white'>سُورَةُ البَقَرَةِ</Text>
                        </View>
                    </Pressable>
                    </Link>
                    <Divider />
                    <Link href={"prayersTable/Quran/surahs/3"} asChild>
                    <Pressable className='flex-row bg-[#0D509D] '>
                        <View className='w-[50] h-[50] items-center justify-center'>
                                <Text className='text-xl font-bold text-white'>3</Text>
                        </View>
                        <View className='flex-col items-center justify-center w-[50%]'>
                                <Text className='text-xl font-bold text-white'>Ali 'Imran</Text>
                                <Text className='text-xl font-bold text-white'>200 ayah Medinan</Text>
                        </View>
                        <View className='items-center justify-center w-[40%]'>
                                <Text className='text-xl font-bold text-white'>سُورَةُ ٱلْفَاتِحَةِ</Text>
                        </View>
                    </Pressable>
                    </Link>
                    <Divider />

                    <Link href={"/prayersTable/Quran/surahs/Surahs"} asChild>
                        <Pressable className='flex-row bg-[#0D509D] justify-between' style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                            <View className='justify-center'>
                                <Text className='text-xl font-bold text-white ml-3'>See More Surahs</Text>
                            </View>
                            <View className='items-center justify-center'>
                                <Icon source={"chevron-right"} color='white' size={25}/>
                            </View>
                        </Pressable>
                    </Link>

                </View>


                <View className='flex-col bg-[#0d509D] w-[95%] mt-5' style={{ borderRadius: 10 }}>
                   <MeccaMedinaCard meccaMedina='Mecca' meccaMedinaDesc='1. The manner of the address of the surahs. The Meccan surahs address people with strength and sternness, why? Because the surahs were directed to the disbelievers. Most people at that time refused to believe in Allah and his prophet. They chose to turn away and treat the prophet and the people who believed in him with arrogance. An example of Makki surahs is surah Al-Qamar.
While Medinan surahs address the people in a kind way. Why, because the surahs are directed to Muslims to show them how to live their lives. An example of Madani surahs is surah al-Maidah.' />
                    <Divider />
                  <MeccaMedinaCard meccaMedina='Medina'  meccaMedinaDesc="One of the easiest ways of distinguishing between the two periods is the manner of address in the Medinan surahs. Whereas the Meccan passages usually speak to Muhammad himself or to men generally, the Medinan passages are often addressed to Muhammad's followers with the introduction Yaa ayyuhallathiina aa'manuu -"  />
                  </View>
        </View>
    </ScrollView>
  )
}

export default ContinueQuran