import { View, Text, Pressable, Image, TextInput } from 'react-native'
import React, {forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetBackdrop, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Icon, Button, Divider } from 'react-native-paper';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { initializePaymentSheet, openPaymentSheet } from '@/src/lib/stripe';
type Ref = BottomSheetModal
type CheckoutSheetProp = {
    promo : string
}
const CheckoutSheet = forwardRef<Ref, CheckoutSheetProp>(({promo}, ref) => {
    const snapPoints = useMemo(() => ["25%"], []);
    const { session } = useAuth()
    const [ subTotal, setSubTotal ] = useState(0)
    const renderBackDrop = useCallback( (props : any ) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/> , [])
    const getTotal = async() => {
        const { data : cart, error } = await supabase.from('user_cart').select('*').eq('user_id', session?.user.id)
        
        if( cart ){
            const totals = cart.map((item) => item.product_price)
            const sumTotals = totals.reduce((acc, item) => acc + item)
            setSubTotal(sumTotals)
        }
        if( error ){
            console.log(error)
        }
    }
    const checkout = async () => {
        await initializePaymentSheet(subTotal)
        await openPaymentSheet
    }
    useEffect(() => {
        getTotal()
        const cart = supabase.channel('Cart changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_cart',
        filter: `user_id=eq.${session?.user.id}`,
      },
      (payload) => getTotal()
    )
    .subscribe();
    return () =>  { supabase.removeChannel(cart) }
    },[])
    return(
        <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: "white"}}
        handleIndicatorStyle={{backgroundColor: "gray"}}
        backdropComponent={renderBackDrop}
        >
            <View className='w-[90%] self-center flex-col h-[90%]' >
                <View className='flex-row justify-between flex-1'>
                    <Text className='text-xl text-gray-400'>Sub Total: </Text>
                    <Text className='text-xl font-bold'>${subTotal}</Text>
                </View>
                {
                    promo && (
                        <View className='flex-row justify-between flex-1'>
                            <Text className='text-xl text-gray-400'>Promo({promo}) {'(15% off)'}:</Text>
                            <Text className='text-xl font-bold text-gray-600'>-${subTotal * .15}</Text>
                        </View>
                    )
                }
                <View className='flex-row justify-between flex-1'>
                    <Text className='text-xl text-gray-400'>Total:</Text>
                    <Text className='text-xl font-bold'>${subTotal}</Text>
                </View>
                <Pressable  style={{ backgroundColor : '#57BA47', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', borderRadius : 20, height: 40}} onPress={checkout} >
                    <Text className='text-white font-bold text-xl'>Pay Now</Text>
                </Pressable>
            </View>
        </BottomSheetModal>
    )
})


export default CheckoutSheet