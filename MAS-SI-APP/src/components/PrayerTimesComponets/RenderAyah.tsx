import { View, Text } from 'react-native'
import React from 'react'
import { ayahsProp } from '@/src/app/(user)/prayersTable/Quran/surahs/[surah_id]'
type RenderAyahProp = {
    ayah : ayahsProp
    index : number
}
const RenderAyah = ( {ayah, index} : RenderAyahProp) => {
  return (
    <View className='flex-row'>
        <View className='w-[50] h-[50] items-center justify-center'>
            <Text className='text-xl font-bold text-[#8a8a8a]'>{index + 1}</Text>
        </View>
        <View className='flex-col items-center justify-center w-[50%]'>
            <Text className='text-xl font-bold'>{ayah.text}</Text>
        </View>
        <View className='items-center justify-center w-[40%]'>
            <Text className='text-xl font-bold'></Text>
        </View>
    </View>
  )
}

export default RenderAyah