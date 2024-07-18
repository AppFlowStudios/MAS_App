import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Surahs from './surahs/Surahs'
import { Divider, Icon } from 'react-native-paper'
import { Link } from 'expo-router'

const ContinueQuran = () => {
    const [ loading,  setLoading ] = useState(true)
    const [ quran, setQuran ] = useState()
    
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
                    <View className='flex-row bg-white' style={{ borderRadius: 10}}>
                    <View className='w-[50] h-[50] items-center justify-center'>
                            <Text className='text-xl font-bold text-[#8a8a8a]'>1</Text>
                    </View>
                    <View className='flex-col items-center justify-center w-[50%]'>
                            <Text className='text-xl font-bold'>Al-Faatiha</Text>
                            <Text className='text-xl font-bold'>7</Text>
                    </View>
                    <View className='items-center justify-center w-[40%]' >
                            <Text className='text-xl font-bold'>سُورَةُ ٱلْفَاتِحَةِ</Text>
                    </View>
                    </View>

                    <Divider />

                    <View className='flex-row bg-white '>
                        <View className='w-[50] h-[50] items-center justify-center'>
                                <Text className='text-xl font-bold text-[#8a8a8a]'>2</Text>
                        </View>
                        <View className='flex-col items-center justify-center w-[50%]'>
                                <Text className='text-xl font-bold'>Al-Baqara</Text>
                                <Text className='text-xl font-bold'>286</Text>
                        </View>
                        <View className='items-center justify-center w-[40%]'>
                                <Text className='text-xl font-bold'>سُورَةُ البَقَرَةِ</Text>
                        </View>
                    </View>

                    <Divider />

                    <View className='flex-row bg-white '>
                        <View className='w-[50] h-[50] items-center justify-center'>
                                <Text className='text-xl font-bold text-[#8a8a8a]'>3</Text>
                        </View>
                        <View className='flex-col items-center justify-center w-[50%]'>
                                <Text className='text-xl font-bold'>Ali 'Imran</Text>
                                <Text className='text-xl font-bold'>200</Text>
                        </View>
                        <View className='items-center justify-center w-[40%]'>
                                <Text className='text-xl font-bold'>سُورَةُ ٱلْفَاتِحَةِ</Text>
                        </View>
                    </View>

                    <Divider />

                    <Link href={"/prayersTable/Quran/surahs/Surahs"} asChild>
                        <Pressable className='flex-row bg-white justify-between' style={{ borderRadius: 10}}>
                            <View className='justify-center'>
                                <Text className='text-xl font-bold text-[#8a8a8a] ml-3'>See More Surahs</Text>
                            </View>
                            <View className='items-center justify-center'>
                                <Icon source={"chevron-right"} color='#8a8a8a' size={25}/>
                            </View>
                        </Pressable>
                    </Link>

                   

                </View>
        </View>
    </ScrollView>
  )
}

export default ContinueQuran