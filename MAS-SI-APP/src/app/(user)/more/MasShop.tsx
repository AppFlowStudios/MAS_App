import { View, Text, ScrollView, useWindowDimensions, Pressable, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import  {LinearGradient } from "expo-linear-gradient"
import { Link, Stack } from 'expo-router'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Icon, Searchbar } from 'react-native-paper'
import { defaultProgramImage } from '@/src/components/ProgramsListProgram'
import ShopCategories from './ShopCategories'
import { useAuth } from '@/src/providers/AuthProvider'
import { supabase } from '@/src/lib/supabase'
const MasShop = () => { 
  const [ cartAmount, setCartAmount ] = useState(0)
  const { session } = useAuth()
  const width = useWindowDimensions().width
  const height = useWindowDimensions().height
  const tabBarHeight = useBottomTabBarHeight() + 30
  const getCartAmount  =  async () => {
    const { data , error } = await supabase.from('user_cart').select("*").eq('user_id', session?.user.id)
    if( error ){
        console.log(error)
    }
    if( data && data.length > 1 ){
        setCartAmount(data.length)
    }
    else{
        setCartAmount(0)
    }
  }

  useEffect(() => {
    getCartAmount()
  }, [])
  return (
    <ScrollView contentContainerStyle={{ height : height, width : width  }} style={{ backgroundColor : "white" }}>
        <Stack.Screen options={{ headerTransparent : true, title : "", headerBackTitleVisible : false }}/>
        <SafeAreaView className='px-3'>
            <View className='flex-row w-[100%] items-center justify-end pl-2 pr-2'>
                <Link href={`more/UserCart/${session?.user.id}`} asChild>
                <Pressable className='items-center p-1 px-3 bg-white flex-row w-[25%] justify-evenly gap-x-3' style={{ borderRadius : 50, shadowColor : '#D3D3D3', shadowOffset : { width  : 0, height : 6 }, shadowOpacity : 2, shadowRadius : 1 }}>
                    <Icon source={"cart-outline"} size={25}/> 
                    <Text className='font-bold text-xl'>{cartAmount}</Text>
                </Pressable>
                </Link>
            </View>
        </SafeAreaView>
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
                <Text className='text-2xl font-bold'>Discover Programs</Text>
            </View>
            <View className='flex-1 '>
                <ShopCategories />
            </View>
           
    </ScrollView>
  )
}

export default MasShop