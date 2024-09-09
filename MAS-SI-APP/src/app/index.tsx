import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Redirect, Link } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';
const index = () => {
   const { session, loading } = useAuth();

   if(loading){
    return <ActivityIndicator />
   }
   
   if (!session) {
    return <Redirect href={"/GreetingScreen"} />
   }

  return (
    <Redirect href={"/(user)"}/>
  )
}

export default index