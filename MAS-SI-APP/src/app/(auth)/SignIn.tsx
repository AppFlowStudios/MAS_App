import { View, Text, Image, Pressable } from 'react-native'
import { Divider, Icon, IconButton, TextInput, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase';
import { Stack, Link } from 'expo-router';
import Animated , { useAnimatedStyle, useSharedValue, withTiming, Easing, ReduceMotion } from 'react-native-reanimated';

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
      <Animated.View className='w-[100%] h-[200] justify-center, items-center  mt-[5%]' style={logoMountAnimeStyle}>
        <Image source={require("@/assets/images/massiLogo.png")} style={{width: "90%", height: "100%", objectFit: "contain"}}/>
      </Animated.View>

      <View className=' justify-center items-center bg-white'>
        <View className='w-[85%] justify-center items-center h-[450]  bg-white' style={{shadowColor: "black", shadowOffset: {width: 0, height: 0}, shadowOpacity: 3, shadowRadius: 3, borderRadius: 8}}>
          <Text className='font-bold text-black text-3xl'>LOGIN</Text>

        <View className='mt-2'>
          <TextInput
            mode='outlined'
            theme={{ roundness : 50 }}
            style={{ width: 250, backgroundColor: "#e8e8e8", height: 50, textDecorationColor : '#b7b7b7'}}
            activeOutlineColor='#0D509D'
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email-outline" color="#b7b7b7"/>}
            placeholder="Email"
          />

          <View className='h-[20]'/>
    
          <TextInput
            mode='outlined'
            theme={{ roundness : 50 }}
            style={{ width: 250, backgroundColor: "#e8e8e8", height: 50, textDecorationColor : '#b7b7b7'}}
            activeOutlineColor='#0D509D'
            value={password}
            onChangeText={setPassword}
            left={<TextInput.Icon icon="key-outline" color="#b7b7b7"/>}
            placeholder="Password"
            secureTextEntry
          />

          <View className=' flex-row mt-2 items-center'>
                <Divider className=' w-[100]' bold/>
                <Text className='font-semi text-black text-lg' > OR </Text>
                <Divider className=' w-[100]' bold/>

          </View>


          <View className='flex-row mt-4 justify-center'>
            <View className='border' style={{ borderRadius : 40 }}>
              <IconButton icon={"google"} iconColor='black' size={20}/>
            </View>
            <View className='w-[15]'></View>
            <View className="border" style={{ borderRadius : 40 }}>
              <IconButton icon={"apple"} iconColor='black' size={20}/>
            </View>
          </View>





        </View>
        <View className='mt-5'/>
          <Button  mode='contained' onPress={signInWithEmail} disabled={loading} buttonColor='#57BA47' textColor='white' className='w-[150]'>Login</Button>

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