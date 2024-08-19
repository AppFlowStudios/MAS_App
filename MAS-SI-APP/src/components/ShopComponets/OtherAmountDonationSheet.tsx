import { View, Text, Pressable, Image, TextInput } from 'react-native'
import React, {forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetBackdrop, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Icon, Button, Divider } from 'react-native-paper';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { initializePaymentSheet, openPaymentSheet } from '@/src/lib/stripe';
type Ref = BottomSheetModal
const OtherAmountDonationSheet = forwardRef<Ref, {}>(({}, ref) => {
    const snapPoints = useMemo(() => ["20%"], []);
    const { session } = useAuth()
    const [ amount, setAmount ] = useState('')
    const renderBackDrop = useCallback( (props : any ) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/> , [])
    const handleAmountChange = (text : string) =>{
        const cleanedValue = text.replace(/[^0-9]/g, '')
        const parsedValue = parseFloat(cleanedValue)

        if(!isNaN(parsedValue)){
            setAmount(parsedValue.toLocaleString('en-usd'))
        }else{
            setAmount('')
        }
    }
    const callForDonationAmount = async (amount : number) => {
        await initializePaymentSheet(Math.floor(amount * 100))
        await openPaymentSheet()
      }
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
            <View className='h-[100%] w-[90%] bg-white border flex-col self-center'>
                <View className='w-[100%]'>
                    <Text className='text-left font-bold text-3xl'>Input Amount</Text>
                </View>
                <View>
                    <BottomSheetTextInput 
                        className='border'
                        keyboardType='numeric'
                        value={amount}
                        onChangeText={handleAmountChange}
                        
                    />
                    <Divider />
                </View>
                <View>
                     <Button icon={"account-heart"} mode='contained' style={{width: 150, alignItems: "center", backgroundColor: "#57BA47", marginTop: 30}} onPress={() => callForDonationAmount(Number(amount))}>Donate Now</Button>
                </View>
            </View>
        </BottomSheetModal>
    )
})

export default OtherAmountDonationSheet