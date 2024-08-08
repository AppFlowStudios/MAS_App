import { View, Text, Dimensions, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { defaultProgramImage } from '@/src/components/ProgramsListProgram';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { supabase } from '@/src/lib/supabase';
import { Program } from '@/src/types';
import { Button, Icon } from 'react-native-paper';
import { useAuth } from '@/src/providers/AuthProvider';

const ProgramInfo = () => {
    const { program_id } = useLocalSearchParams()
    const { session } = useAuth()
    const [ program, setProgram ] = useState<Program>()
    const [ visible, setVisible ] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const Tab = useBottomTabBarHeight()
  
    const { width } = Dimensions.get("window")
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const imageAnimatedStyle = useAnimatedStyle(() => {
      return{
        transform: [
          {
            translateY : interpolate(
            scrollOffset.value,
            [-250, 0, 250 ],
            [-250/2, 0, 250 * 0.75]
            )
          },
          {
            scale: interpolate(scrollOffset.value, [-250, 0, 250], [2, 1, 1])
          }
        ]
      }
    })

    const getInfo = async () => {
        const { data , error } = await supabase.from("programs").select("*").eq("program_id", program_id).single()
        if( data ) {
            setProgram(data)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])
  return (
    <View className='flex-1 bg-white pt-[15%]' style={{flexGrow: 1}}>
    <Stack.Screen options={ { title : "Details", headerTransparent: true, headerRight : () => (
        <Link href={`more/UserCart/${session?.user.id}`} asChild>
            <Pressable className='border items-center p-2 ' style={{ borderWidth : 2 , borderRadius : 50 }}>
                    <Icon source={"cart-outline"} size={25}/> 
            </Pressable>
        </Link>
        )}}  />
     <Animated.ScrollView ref={scrollRef}  scrollEventThrottle={16} contentContainerStyle={{justifyContent: "center", alignItems: "center", marginTop: "14%" }} >
         
         <Animated.Image 
           source={ { uri: program?.program_img || defaultProgramImage } }
           style={ [{width: width / 1.2, height: 300, borderRadius: 8 }, imageAnimatedStyle] }
           resizeMode='stretch'
         />
        
        <View className='flex-row justify-between w-[100%] px-5 bg-white'>
            <Text className='text-black font-bold text-xl w-[50%]'>{program?.program_name}</Text>
            <Text className='text-[#57BA47] font-bold text-lg w-[50%] text-center'>${program?.program_price}<Text className='text-black text-md'> / Month</Text> </Text>
        </View>
        
        <ScrollView className='mt-5 w-[100%] bg-white' contentContainerStyle={{ alignItems : 'center' }}>
            <View className='w-[90%] h-[150] bg-black' style={{ shadowColor : "black", shadowOffset : { width : 0, height : 0}, shadowOpacity : 1, shadowRadius : 2}}>

            </View>
        </ScrollView>
        
        <View className='flex-row justify-between px-3 w-[100%]'>
            <View className='flex-col'>
                <Text>Meeting Days</Text>

            </View>

            <View className='flex-col'>
                <Text>Time</Text>
            </View>
        </View>

        <View className='flex-row justify-between px-3 w-[100%]'>
         <View className='flex-row'> 
             <Button mode='contained' style={{ backgroundColor : "gray" }} icon={ () => <Icon source={"cart-outline"} size={20}/>}>Add to Cart</Button>
         </View>
         <Button mode='contained' style={{ backgroundColor : '#57BA47' }}>Buy Now</Button>
        </View>
     </Animated.ScrollView>
     </View>
  )
}

export default ProgramInfo