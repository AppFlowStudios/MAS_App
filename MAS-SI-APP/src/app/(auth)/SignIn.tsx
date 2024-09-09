import { View, Text, Image, Pressable } from 'react-native'
import { Divider, Icon, IconButton, TextInput, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase';
import { Stack, Link } from 'expo-router';
import Animated , { useAnimatedStyle, useSharedValue, withTiming, Easing, ReduceMotion } from 'react-native-reanimated';
import { StatusBar } from "react-native"
const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [ email, setEmail ] = useState('')
    const [ password, setPassword] = useState("")
    
    const logoAnime = useSharedValue(0)
    const logoBounce = useSharedValue(-200)
    const logoMountAnimeStyle = useAnimatedStyle(() => {
     return {
       opacity : logoAnime.value,
       transform: [{translateY : logoBounce.value}]
     }
    })

    const logoMountAnimeFunc = () => {
      
      logoBounce.value = withTiming(15, {
        duration: 2000,
        easing: Easing.elastic(1.3),
        reduceMotion: ReduceMotion.System,
      })

      logoAnime.value = withTiming(1, {duration: 2000})
    }
    async function signInWithEmail() {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    
      if (error) alert(error.message);
      setLoading(false);
    }  

    const guestSignIn = async () => {
      const { data, error } = await supabase.auth.signInAnonymously()
      if( error ){
        console.log( error )
      }
    }
    useEffect(() => {
      logoMountAnimeFunc()
    }, [])
  return (
    <View className='bg-white h-[100%]'>
      <Stack.Screen options={{ headerTransparent : true, headerTitle : '', headerBackTitleVisible : false }} />
      <StatusBar barStyle={"dark-content"}/>
      <View className='h-[25%] bg-gray-300 justify-end px-8' style={{ borderBottomRightRadius : 40, borderBottomLeftRadius : 40}}>
        <View className='pt-8'>
          <Text className=' text-white italic' style={{ fontSize : 45 }}>Account <Text className='font-bold'>Login</Text></Text>
        </View>
        <View className='pt-4 p-2 rounded-3xl w-[55%] border-white flex-row justify-between items-center mb-4' style={{ borderWidth : 4}}>
          <Text className='text-white'>new member?</Text>
          <Icon source={'arrow-right-thin'} size={20} color='white'/>
        </View>
      </View>
      <View className=' justify-center items-center bg-white pt-[12%] flex-col flex-2'>
        <View className='w-[95%]' style={{ shadowColor : 'black', shadowOffset : { width : 0, height : 2 }, shadowOpacity : 0.5, shadowRadius : 1 }}>
          <TextInput
            mode='outlined' 
            value={email}
            onChangeText={setEmail}
            style={{ backgroundColor : 'white', borderBottomWidth : 0, borderWidth : 0 }}
            theme={{ roundness : 50 }}
            placeholder={'email'}
            outlineColor='white'
            activeOutlineColor='white'
          />
        </View>
        <View className='w-[95%] mt-2' style={{ shadowColor : 'black', shadowOffset : { width : 0, height : 2 }, shadowOpacity : 0.5, shadowRadius : 1 }}>
          <TextInput
            mode='outlined' 
            value={password}
            onChangeText={setPassword}
            style={{ backgroundColor : 'white', borderBottomWidth : 0, borderWidth : 0 }}
            theme={{ roundness : 50 }}
            placeholder={'password'}
            outlineColor='white'
            activeOutlineColor='white'
            secureTextEntry
          />
        </View>
        <View className='w-[90%] mt-2'>
          <Text className='text-[#007AFF] text-left'>Forgot Your Password?</Text>
        </View>
        <View className='w-[40%] flex-2 mt-10' style={{ shadowColor : 'black', shadowOffset : { width : 0, height : 2 }, shadowOpacity : 0.5, shadowRadius : 1 }}>
          <Button onPress={signInWithEmail} mode='contained' buttonColor='#57BA47' textColor='white'>login</Button>
        </View>
      </View>
      <View className='flex-row w-[90%] items-center justify-center self-center mt-10'>
        <Divider className='w-[40%] border-2 border-gray-200 rounded-xl'/>
        <Text className='px-2'>or login with</Text> 
        <Divider className='w-[40%] border-2 border-gray-200 rounded-xl'/>
      </View>
    </View>
  )
}

export default SignIn