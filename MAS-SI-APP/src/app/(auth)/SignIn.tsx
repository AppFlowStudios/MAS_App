import { View, Text, TextInput, Button } from 'react-native'
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
    <View >
    <Stack.Screen options={{ title: 'Sign in' }} />

    <Text >Email</Text>
    <TextInput
      value={email}
      onChangeText={setEmail}
      placeholder="jon@gmail.com"
    />

    <Text >Password</Text>
    <TextInput
      value={password}
      onChangeText={setPassword}
      placeholder=""
      secureTextEntry
    />

    <Button title='Login' onPress={signInWithEmail} disabled={loading}/>

    <Link href="/SignUp" >
      Create an account
    </Link>
  </View>
  )
}

export default SignIn