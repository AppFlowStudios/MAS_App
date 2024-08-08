import { View, Text, ScrollView, useWindowDimensions, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import  {LinearGradient } from "expo-linear-gradient"
import { Link, Stack } from 'expo-router'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Icon, Searchbar } from 'react-native-paper'
import { defaultProgramImage } from '@/src/components/ProgramsListProgram'
import ShopCategories from './ShopCategories'
import { useAuth } from '@/src/providers/AuthProvider'
const MasShop = () => { 
  const { session } = useAuth()
  const width = useWindowDimensions().width
  const height = useWindowDimensions().height
  const tabBarHeight = useBottomTabBarHeight() + 30
  const [ searchQuery, setSearchQuery ] = useState<string>("")
  return (
    <ScrollView contentContainerStyle={{ height : height, width : width  }} style={{ backgroundColor : "#ADDFFF" }}>
        <Stack.Screen options={{ headerTransparent : true, title : "", headerBackTitleVisible : false }}/>
        <View className='bg-[#ADDFFF] pt-[25%]'/>
        <LinearGradient 
        colors={ ["#ADDFFF", "white",] }
        style={{ flex : 1, position: 'absolute', height: '100%', width : "100%" }}
        />
        <View className='flex-row w-[100%] items-center justify-between pl-2 pr-2'>
            <Searchbar value={searchQuery} onChangeText={setSearchQuery} style={{ width : "80%", height : 40, alignItems : "center", justifyContent : 'center', textAlign : "center"}} className='border'/>

            <Link href={`more/UserCart/${session?.user.id}`} asChild>
            <Pressable className='border items-center p-2 ' style={{ borderWidth : 2 , borderRadius : 50 }}>
                <Icon source={"cart-outline"} size={30}/> 
            </Pressable>
            </Link>
        </View>
        
        <LinearGradient colors={["#d3d3d3", "#949494"]} start={{ x : 0.1, y: 0.2 }} style={{ flexDirection : "row", width : "90%", alignSelf : "center", marginTop : 10, height : 100, borderRadius : 10 }} locations={[0.9, 1]}>
            <View className='px-3 py-3 flex-col'>
                <Text className='text-white font-bold'>Promos for fast purchase</Text>
                <Text>Special Offer</Text>
                <Text className='text-white font-bold'>15% off</Text>
            </View>
            <View className='h-[100] w-[40%] items-center justify-center'>
                <Image 
                    source={{ uri : defaultProgramImage }}
                    style={{ height : "90%", width : "100%", objectFit : 'fill', borderRadius : 10 }}
                />
            </View>
        </LinearGradient>
        <View className='mt-3 px-3'>
            <Text className='text-2xl font-bold'>Categories</Text>
        </View>
        <ShopCategories />
        <View  className='bg-white' style={{ paddingBottom : tabBarHeight}}/>
    </ScrollView>
  )
}

export default MasShop