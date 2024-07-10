import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
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
    <View className='border w-full h-full'>
      <View className='justify-center items-center'>
         <Image source={require("@/assets/images/massiLogo2.png")} style={{width: width / 2, height: 200, justifyContent: "center", objectFit: "contain" }} className='border'/>
      </View>
      <View className='justify-center items-center'>
        <TextInput 
          label="Email"
          mode='outlined'
          value={email}
          onChangeText={text => setEmail(text)}
          outlineStyle={{width: 200}}
        />  
        
        <TextInput 
          label="Password"
          mode='outlined'
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          value={password}
          onChangeText={text => setPassword(text)}
          outlineStyle={{width: 200}}
        />  

        <Button onPress={signUpWithEmail} disabled={loading}>Sign Up</Button>
        </View>
    </View>
  )
}

export default SignUp