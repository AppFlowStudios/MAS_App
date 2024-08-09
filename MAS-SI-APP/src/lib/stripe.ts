import { Alert } from "react-native"
import { supabase } from "./supabase"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native"

const fetchPaymentSheetParam = async ( amount : number ) => {
    const { data, error } = await supabase.functions.invoke('payment-sheet', { body : { amount } })
    if( data ){
        return data
    }
   if( error ){
    Alert.alert(error.message)
   }
   return {}
    
}       

export const initializePaymentSheet = async ( amount : number ) => {
    console.log('Payment Sheet Amount', amount)
    const { paymentIntent, publishableKey } = await fetchPaymentSheetParam(amount)
    if( !paymentIntent || !publishableKey ) return

    const { error } = await initPaymentSheet({
        merchantDisplayName : 'MAS Staten Island',
        paymentIntentClientSecret : paymentIntent,
        defaultBillingDetails : {
            name : 'Jane Doe'
        }
    })
}

export const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()
    if( error ){
        console.log(error)
        return false
    }
    return true
}