import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Link, Stack } from "expo-router"
const SignUp = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword] = useState("")
  const { width } = Dimensions.get("window")
  return (
    <View className='justify-center items-center border w-[100%]'>
      <View className='justify-center items-center'>
         <Image source={require("@/assets/images/massiLogo2.png")} style={{width: width / 2, height: 300, justifyContent: "center" }} />
      </View>
      
      <TextInput 
        label="Email"
        mode='outlined'
        value={email}
        onChangeText={text => setEmail(text)}
        outlineStyle={{width: 300}}
      />  
      
      <TextInput 
        label="Password"
        mode='outlined'
        value={password}
        onChangeText={text => setPassword(text)}
      />  

    </View>
  )
}

export default SignUp