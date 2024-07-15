import { View, Text, Pressable, ScrollView } from 'react-native'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Icon } from "react-native-paper"
const PlaylistIndex = () => {
  return (
    <ScrollView className='bg-white h-full'>
        <View className='flex-row items-center'>
        <Link href={"/myPrograms/likedLectures"} asChild>
        <Pressable className='flex-row items-center ml-2'>
          <Icon source={"heart-box-outline"} color='red' size={30}/>
          <Text className='text-xl font-bold px-[13]'>Favorite Lectures</Text>
        </Pressable>
        </Link>
      </View> 
    </ScrollView>
  )
}

export default PlaylistIndex