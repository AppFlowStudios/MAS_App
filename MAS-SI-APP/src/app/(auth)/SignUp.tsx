import { View, Text, Image, Dimensions, StatusBar, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, Icon, TextInput } from 'react-native-paper'
import { Link, Stack } from "expo-router"
import { supabase } from '@/src/lib/supabase'
const SignUp = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword] = useState("")
  const [ loading, setLoading ] = useState(false)
  const { width } = Dimensions.get("window")

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) alert(error.message)
    if (!session) alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View className='border w-full h-full bg-white'>
      <Stack.Screen options={{ headerTransparent : true, headerTitle : '', headerBackTitleVisible : false }}/>
      <StatusBar barStyle={"dark-content"}/>
      <View className='h-[25%] justify-end px-8' style={{ borderBottomRightRadius : 40, borderBottomLeftRadius : 40, backgroundColor : 'gray'}}>
        <View className='pt-8'>
          <Text className=' text-white italic' style={{ fontSize : 40 }}>Account <Text className='font-bold'>Sign Up</Text></Text>
        </View>
        <Link href={'/SignIn'} asChild>
          <Pressable className='pt-4 p-2 rounded-3xl w-[55%] border-white flex-row justify-between items-center mb-4' style={{ borderWidth : 4}}>
            <Text className='text-white'>already a member?</Text>
            <Icon source={'arrow-right-thin'} size={20} color='white'/>
          </Pressable>
        </Link>
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
            textColor='black'
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
            textColor='black'
          />
        </View>
        <View className='w-[40%] flex-2 mt-10' style={{ shadowColor : 'black', shadowOffset : { width : 0, height : 2 }, shadowOpacity : 0.5, shadowRadius : 1 }}>
          <Button onPress={signUpWithEmail} mode='contained' buttonColor='#57BA47' textColor='white'>Sign Up</Button>
        </View>
      </View>
    
    </View>
  )
}

export default SignUp