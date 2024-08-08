import { View, Text, ScrollView, useWindowDimensions, Image, Pressable } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { defaultProgramImage } from '@/src/components/ProgramsListProgram'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-paper'
import { Link } from 'expo-router'

const Index = () => {
  const width = useWindowDimensions().width
  const height = useWindowDimensions().height
  const tabBarHeight = useBottomTabBarHeight() + 60
  return (
    <ScrollView className='bg-gray-200 pt-[15%] h-[100%]'>
      <View className='w-[100%] items-center justify-center' style={{ height : height / 4 }}>
        <View style={{  shadowColor : "black", shadowOffset : {width : 0, height : 0}, shadowOpacity : 1, shadowRadius : 5  }}>
          <Image 
            source={{ uri : defaultProgramImage }}
            style={{ width : 100, height : 100, borderRadius : 50, borderColor : "yellow", borderWidth : 2 }}
          />
        </View>
      </View>
      <View className='items-center' style={{ paddingBottom : tabBarHeight }}>
          <View className='flex-1 flex-col items-center pb-10 w-[95%]' style={{ borderRadius : 20, shadowColor : 'black', shadowOffset : { width : 0, height : 0}, shadowOpacity : 1, shadowRadius : 2  }}>
            <Pressable className='w-[85%] bg-gray-400 mt-8 items-center flex-col px-5' style={{ borderRadius  : 10, shadowColor : '#57BA47', shadowOffset : { width : 0, height : 0}, shadowOpacity : 1, shadowRadius : 2 }}>
              <View className='flex-row items-center justify-between px-1 w-[100%]'>
                <Text className='font-bold text-gray-300'>Your Account</Text>
                <Icon source={'chevron-right'} size={25} color='white'/>
              </View>
              <View className='flex-row w-[100%]'>
                  <View style={{ borderWidth : 2, borderColor : 'white', borderRadius : 10 ,backgroundColor : 'white'}}>
                    <Icon source={"cog-outline"} size={40} color='black'/>
                  </View>
                  <Text className='text-3xl  text-white font-bold'> Settings</Text>
              </View>
              <View className='w-[100%]'>
                <Text className='font-bold text-gray-300'>Password, Security, Personal Details</Text>
              </View>
            </Pressable>

            <Link href={"/more/MasShop"} asChild>
            <Pressable className='w-[85%] bg-gray-400 mt-8 items-center flex-col px-5' style={{ borderRadius  : 10, shadowColor : '#57BA47', shadowOffset : { width : 0, height : 0}, shadowOpacity : 1, shadowRadius : 2 }}>
              <View className='flex-row items-center justify-between px-1 w-[100%]'>
                <Text className='font-bold text-gray-300'>Join Programs</Text>
                <Icon source={'chevron-right'} size={25} color='white'/>
              </View>
              <View className='flex-row w-[100%]'>
                  <View style={{ borderWidth : 2, borderColor : 'white', borderRadius : 10 ,backgroundColor : 'white'}}>
                    <Icon source={"shopping-outline"} size={40} color='#0D509D'/>
                  </View>
                  <Text className='text-3xl  text-white font-bold ml-1'>MAS Shop</Text>
              </View>
              <View className='w-[100%]'>
                <Text className='font-bold text-gray-300'>Cart, Payment, Orders</Text>
              </View>
              </Pressable>
            </Link>

            <Link href={"/more/Donation"} asChild>
              <Pressable className='w-[85%] bg-gray-400 mt-8 items-center flex-col px-5' style={{ borderRadius  : 10, shadowColor : '#57BA47', shadowOffset : { width : 0, height : 0}, shadowOpacity : 1, shadowRadius : 2 }}>
                <View className='flex-row items-center justify-between px-1 w-[100%]'>
                  <Text className='font-bold text-gray-300'>Support Your Community</Text>
                  <Icon source={'chevron-right'} size={25} color='white'/>
                </View>
                <View className='flex-row w-[100%]'>
                    <View style={{ borderWidth : 2, borderColor : 'white', borderRadius : 10 ,backgroundColor : 'white'}}>
                      <Icon source={"cards-heart-outline"} size={40} color='red'/>
                    </View>
                    <Text className='text-3xl  text-white font-bold ml-1'>Donate</Text>
                </View>
                <View className='w-[100%]'>
                  <Text className='font-bold text-gray-300'>Payment, Graph, Phase 2</Text>
                </View>
                </Pressable>
            </Link>
              <Pressable className='w-[85%] bg-gray-400 mt-8 items-center flex-col px-5' style={{ borderRadius  : 10, shadowColor : '#57BA47', shadowOffset : { width : 0, height : 0}, shadowOpacity : 1, shadowRadius : 2 }}>
                  <View className='flex-row items-center justify-between px-1 w-[100%]'>
                    <Text className='font-bold text-gray-300'>Show Your Business</Text>
                    <Icon source={'chevron-right'} size={25} color='white'/>
                  </View>
                  <View className='flex-row w-[100%]'>
                      <View style={{ borderWidth : 2, borderColor : 'white', borderRadius : 10 ,backgroundColor : 'white'}}>
                        <Icon source={"thumb-up-outline"} size={40} color='black'/>
                      </View>
                      <Text className='text-3xl  text-white font-bold ml-1'>Sponser</Text>
                  </View>
                  <View className='w-[100%]'>
                    <Text className='font-bold text-gray-300'>Payment, Graph, Phase 2</Text>
                  </View>
                </Pressable>


            <View className='w-[95%] bg-white mt-8 items-center justify-center p-4' style={{ borderRadius : 10}}>
              <Text adjustsFontSizeToFit allowFontScaling numberOfLines={1}  className='text-gray-400'>Created By: App Flow Creations (appflowcreations@gmail.com)</Text>
            </View>
          </View>
      </View>


    </ScrollView>
  )
}

export default Index