import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from "expo-router"
import { isLoading } from 'expo-font'
import { ActivityIndicator } from 'react-native-paper'
const Quran = () => {
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
{ /* console.log(quran?.data.surahs[0].ayahs[0].text) */ }  
    if( loading ){
        return(
            <View className='items-center justify-center h-[100%]'>
                <ActivityIndicator />
            </View>
        )
    }
    return (
        <View>
        <Stack.Screen options={{ title : "Quran"}}/>
            <Text>Quran</Text>
        </View>
    )
    }

    export default Quran