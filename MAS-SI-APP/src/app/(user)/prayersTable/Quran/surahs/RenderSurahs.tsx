import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { surahProp } from './Surahs'
import { Link } from 'expo-router'
type RenderSurahsProp = {
    surah : surahProp
    index : number
}
const RenderSurahs = ({ surah, index } : RenderSurahsProp) => {
  return (
    <Link href={`prayersTable/Quran/surahs/${surah.number}`} asChild>
        <Pressable className='flex-row'>
        <View className='w-[50] h-[50] items-center justify-center'>
                <Text className='text-xl font-bold text-[#8a8a8a]'>{index + 1}</Text>
            </View>
            <View className='flex-col items-center justify-center w-[50%]'>
                <Text className='text-xl font-bold'>{surah.englishName}</Text>
                <View className='flex-row justify-center items-center'>
                    <Text className='text-[#8a8a8a] font-bold'>Number of Ayahs: </Text>
                    <Text className='text-xl font-bold'>{surah.numberOfAyahs}</Text>
                </View>
            </View>
            <View className='items-center justify-center w-[40%]'>
                <Text className='text-xl font-bold'>{surah.name}</Text>
            </View>
        </Pressable>
    </Link>

  )
}

export default RenderSurahs