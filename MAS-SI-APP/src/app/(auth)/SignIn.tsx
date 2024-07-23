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

    useEffect(() => {
      logoMountAnimeFunc()
    }, [])
  return (
    <View className='bg-white h-[100%]'>
      <Stack.Screen options={{ headerShown : false}} />
      <StatusBar barStyle={"dark-content"}/>
      <Animated.View className='w-[100%] h-[200] justify-center, items-center  mt-[5%]' style={logoMountAnimeStyle}>
        <Image source={require("@/assets/images/massiLogo.png")} style={{width: "90%", height: "100%", objectFit: "contain"}}/>
      </Animated.View>

      <View className=' justify-center items-center bg-white'>
        <View className='w-[85%]  items-center h-[550]  bg-white' style={{shadowColor: "black", shadowOffset: {width: 0, height: 0}, shadowOpacity: 3, shadowRadius: 3, borderRadius: 8}}>
          <Text className='font-bold text-[#0D509D] text-3xl mt-[10%]'>LOGIN</Text>

        <View className='mt-2 items-center'>
          <TextInput
            mode='outlined'
            theme={{ roundness : 50 }}
            style={{ width: 300, backgroundColor: "#e8e8e8", height: 45 }}
            activeOutlineColor='#0D509D'
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email-outline" color="#b7b7b7"/>}
            placeholder="Email"
            textColor='black'
          />

          <View className='h-[20]'/>
    
          <TextInput
            mode='outlined'
            theme={{ roundness : 50 }}
            style={{ width: 300, backgroundColor: "#e8e8e8", height: 45}}
            activeOutlineColor='#0D509D'
            value={password}
            onChangeText={setPassword}
            left={<TextInput.Icon icon="key-outline" color="#b7b7b7"/>}
            placeholder="Password"
            secureTextEntry
            textColor='black'
          />

          <View className=' flex-row mt-2 items-center'>
                <Divider className=' w-[100]' bold/>
                <Text className='font-semi text-black text-lg' > OR </Text>
                <Divider className=' w-[100]' bold/>

          </View>


          <View className='flex-col mt-4 justify-center items-center px-3'>
          <Image source={require("@/assets/images/googlelog2.png")} style={{ width : 250, height: 55, objectFit: 'fill'}} className='mb-1'/>
            <Image source={require("@/assets/images/apple-signinbutton-560.png")} style={{ width : 300, height: 50, objectFit: 'cover'}} className='mb-1'/>
          </View>





        </View>
        <View className='mt-5'/>
          <Button  mode='contained' onPress={signInWithEmail} disabled={loading} buttonColor='#57BA47' textColor='white' className='w-[150]'>LOGIN</Button>

          <Link href="/SignUp" asChild>
            <Pressable className='flex-row justify-center mt-[8%]'>
          <Text>Don't have an account?  </Text>
          
          <Text className='text-[#0D509D]'>Sign Up</Text>
            </Pressable>
          </Link>
        </View>
      </View>
      

      
  </View>
  )
}

export default SignIn