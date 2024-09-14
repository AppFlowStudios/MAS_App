import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { Button, Icon } from 'react-native-paper'
import { useAuth } from '@/src/providers/AuthProvider'
import { supabase } from '@/src/lib/supabase'
import { Badge } from 'react-native-paper'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { opacity } from 'react-native-redash'
const CartButton = () => {
  const { session } = useAuth()
  const [ cartAmount, setCartAmount ] = useState(0)
  const [ cartChanged, setCartChanged ] = useState(false)
  const width = useSharedValue(50)
  const showCartQuant = useSharedValue(0)
  const cartQuantScale = useSharedValue(1)
  const [ badgeVisible, setBadgeVisible ] = useState(true)

  const checkOutAnimatedStyle = useAnimatedStyle(() => {
    return{
        width: width.value
    }
  })
  
  const onChangeToCartStyle = useAnimatedStyle(() => {
    return{
        opacity : showCartQuant.value,
        transform : [{ scale : cartQuantScale.value}]
    }
  })
  const onChangeToCart = () => {
    setCartChanged(true)
    setBadgeVisible(false)
    width.value = withSequence(withTiming(100, { duration : 500 }), withTiming(50, { duration : 1000 }))
    showCartQuant.value = withSequence(withTiming(1, { duration : 500 }), withTiming(0, { duration : 1000 }))
    cartQuantScale.value = withSequence(withTiming(1.5, { duration : 500 }), withTiming(1, { duration : 1000 }, () => {
      runOnJS(setBadgeVisible)(true)
    }))
  }

  const getCartAmount  =  async () => {
    const { data , error } = await supabase.from('user_cart').select("*").eq('user_id', session?.user.id)
    if( error ){
        console.log(error)
    }
    if( data && data.length >= 1 ){
        const totals = data.map((item) => item.product_quantity)
        const sumTotals = totals.reduce((acc, item) => acc + item)
        setCartAmount(sumTotals)
        onChangeToCart()
    }
    else{
        setCartAmount(0)
    }
  }

  useEffect(() => {
    getCartAmount()
    const checkCart = supabase.channel('Check User Cart').on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'user_cart',
            filter: `user_id=eq.${session?.user.id}`
        },
        ( payload ) => getCartAmount()
        )
        .subscribe()

        return () => { supabase.removeChannel( checkCart ) }
  }, [])

  return (
    <Animated.View style={checkOutAnimatedStyle}>
        <Link href={`more/UserCart/${session?.user.id}`} asChild>
          <Pressable className='flex-row relative w-[100%] px-3 bg-white items-center' style={{ borderRadius : 50, shadowColor : '#D3D3D3', shadowOffset : { width  : 0, height : 6 }, shadowOpacity : 2, shadowRadius : 1, justifyContent : cartChanged ? 'space-between': 'flex-start' }}>
              <Icon source={"cart-outline"} size={25} /> 
              <Badge 
              style={{ position: 'absolute', top: -9, right: -2 }} 
              size={18}
              visible={badgeVisible}
              >
                  {cartAmount}
              </Badge>
              <Animated.View style={onChangeToCartStyle}>
                  <Text className='text-green-500 font-bold'>{cartAmount}</Text>
              </Animated.View>
          </Pressable>
        </Link>
      </Animated.View>  
    )
}

export default CartButton

  {/*  <Pressable className='items-center p-1 px-3 bg-white flex-row w-[100%] justify-evenly gap-x-3' style={{ borderRadius : 50, shadowColor : '#D3D3D3', shadowOffset : { width  : 0, height : 6 }, shadowOpacity : 2, shadowRadius : 1 }}>
            <Icon source={"cart-outline"} size={25}/> 
            <Text className='font-bold text-xl'>{cartAmount}</Text>
        </Pressable> */ }