import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import { ActivityIndicator, Button, Icon, TextInput } from 'react-native-paper'
import CartProgramItems, { CartEventItems } from '@/src/components/ShopComponets/CartItems'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
type CartProp = {
    user_id : string
    program_id : string | null
    event_id : string | null
    product_quantity : number
}
const Cart = () => {
  const { user_id } = useLocalSearchParams()
  const [ cartContent, setCartContent ] = useState<CartProp[]>()
  const [ loading, setLoading ] = useState(true)
  const [ promo, setPromo ] = useState('')
  const [ total, setTotal ] = useState(0)
  const tabBarHeight = useBottomTabBarHeight() + 30
  const [ opened, setOpened ] = useState(false)
  const onItemPress = () => {
    setOpened(!opened)
  }
  
  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = opened ? withTiming(100) : withTiming(0);
    return{
        height: animatedHeight
    }
  })
  const getCart = async () =>{
    const { data, error } = await supabase.from("user_cart").select("*").eq("user_id", user_id)
    if( data ){
        setCartContent(data)
    }
  }

  useEffect(() => {
    getCart()

    const cart = supabase.channel('Cart Adds')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'user_cart',
        filter: `user_id=eq.${user_id}`,
      },
      (payload) => getCart()
    )
    .subscribe();
    setLoading(false)
    return () =>  {supabase.removeChannel(cart) }
  }, [])
  if( loading ){
    return(
        <ScrollView contentContainerStyle={{ height : "100%", width : "100%", alignItems : "center", justifyContent : "center" }}>
            <ActivityIndicator />
        </ScrollView>
    )
  }
  
  return (
    <View className='flex-1 bg-white' style={{ paddingBottom : tabBarHeight }}>
    <ScrollView className='bg-white'>
        <Stack.Screen options={{ title : "My Cart", headerBackTitleVisible : false }}/>
        {
            cartContent && cartContent.length > 0 ? cartContent.map(( item, index ) => {
              if( item.program_id ){
                return <CartProgramItems program_id={item.program_id} product_quantity={item.product_quantity} setTotal={setTotal} total={total}/>
              }
              else if( item.event_id) {
                return  <CartEventItems event_id={item.event_id} product_quantity={item.product_quantity} setTotal={setTotal} total={total}/>
              }
            }) : <View><Text> Your Cart Is Empty! </Text></View>
        }
    </ScrollView>
    <View className='self-center mb-3'>
        <TextInput
            mode='outlined'
            theme={{ roundness : 50 }}
            style={{ width: 300, backgroundColor: "#e8e8e8", height: 45}}
            activeOutlineColor='#0D509D'
            value={promo}
            onChangeText={setPromo}
            placeholder="PromoCode"
            secureTextEntry
            textColor='black'
            right={<TextInput.Affix text="Apply" textStyle={{ color : 'black' }}/>}
          />
    </View>
    <View className='w-[90%] self-center'>
      <Pressable  style={{ backgroundColor : '#57BA47', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', borderRadius : 20}} onPress={onItemPress} >
        <View style={{ transform : opened ? [{rotate : '180deg'}]  : "" }}>
                <Icon source={"chevron-up"} color='white' size={20} />
        </View>
        <Text className='text-white font-bold text-xl'>Checkout</Text>
      </Pressable>
      <Animated.View style={[animatedStyle]} className='bg-black'>
            <Text>
            </Text>
        </Animated.View>
    </View>
    </View>
  )
}

export default Cart