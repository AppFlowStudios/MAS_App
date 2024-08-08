import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import { ActivityIndicator } from 'react-native-paper'
type CartProp = {
    user_id : string
    program_id : string | null
    event_id : string | null
}
const Cart = () => {
  const { user_id } = useLocalSearchParams()
  const [ cartContent, setCartContent ] = useState<CartProp[]>()
  const [ loading, setLoading ] = useState(true)
  const getCart = async () =>{
    const { data, error } = await supabase.from("user_cart").select("*").eq("user_id", user_id)
    if( data ){
        setCartContent(data)
    }
  }

  useEffect(() => {
    getCart()
    setLoading(false)
  }, [])

  if( loading ){
    return(
        <ScrollView contentContainerStyle={{ height : "100%", width : "100%", alignItems : "center", justifyContent : "center" }}>
            <ActivityIndicator />
        </ScrollView>
    )
  }

  return (
    <ScrollView>
        <Stack.Screen options={{ title : "My Cart", headerBackTitleVisible : false }}/>
        {
            cartContent && cartContent.length > 0 ? <View></View> : <View><Text> Your Cart Is Empty! </Text></View>
        }
    </ScrollView>
  )
}

export default Cart