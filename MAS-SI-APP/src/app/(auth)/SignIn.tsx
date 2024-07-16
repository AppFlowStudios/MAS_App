import { View, Text, Image, Pressable } from 'react-native'
import { Divider, Icon, IconButton, TextInput, Button } from 'react-native-paper';
import React, { useState } from 'react'
import { supabase } from '@/src/lib/supabase';
import { Stack, Link } from 'expo-router';
const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [ email, setEmail ] = useState('')
    const [ password, setPassword] = useState("")
    
    async function signInWithEmail() {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    
      if (error) alert(error.message);
      setLoading(false);
    }  
  return (
    <View className='bg-white h-[100%]'>
      <Stack.Screen options={{ headerShown : false}} />
      <View className='w-[100%] h-[200] justify-center, items-center  mt-[5%]'>
        <Image source={require("@/assets/images/massiLogo.png")} style={{width: "90%", height: "100%", objectFit: "contain"}}/>
      </View>

      <View className=' justify-center items-center bg-white'>
        <View className='w-[85%] justify-center items-center h-[400]  bg-white' style={{shadowColor: "black", shadowOffset: {width: 0, height: 0}, shadowOpacity: 1, shadowRadius: 1, borderRadius: 8}}>
          <Text className='font-bold text-black text-3xl'>LOGIN</Text>
          <View className='flex-row mt-4'>
            <View className='border' style={{ borderRadius : 40 }}>
              <IconButton icon={"google"} iconColor='black' size={20}/>
            </View>
            <View className='w-[15]'></View>
            <View className="border" style={{ borderRadius : 40 }}>
              <IconButton icon={"apple"} iconColor='black' size={20}/>
            </View>
          </View>


          <View className=' flex-row mt-2 items-center'>
                <Divider className=' w-[100]' bold/>
                <Text className='font-semi text-black text-lg' > OR </Text>
                <Divider className=' w-[100]' bold/>

          </View>



        <View className='mt-2'>
          <TextInput
            mode='outlined'
            style={{ width: 250, borderRadius: 50, backgroundColor: "#FEFEFE", height: 50}}
            activeOutlineColor='#0D509D'
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email-outline"/>}
            placeholder="Email"
          />

          <View className='h-[20]'/>
    
          <TextInput
            mode='outlined'
            style={{ width: 250, borderRadius: 50, backgroundColor: "#FEFEFE", height: 50}}
            activeOutlineColor='#0D509D'
            value={password}
            onChangeText={setPassword}
            left={<TextInput.Icon icon="key-outline" />}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View className='mt-5'/>
        <Button  mode='contained' onPress={signInWithEmail} disabled={loading} buttonColor='#57BA47' textColor='white' >Login</Button>

        </View>
      </View>
      

      <Link href="/SignUp" asChild>
        <Pressable className='flex-row justify-center mt-[40%]'>
          <Text>Don't have an account?  </Text>
          
          <Text className='text-[#0D509D]'>Sign Up</Text>
        </Pressable>
      </Link>
  </View>
  )
}

export default SignIn