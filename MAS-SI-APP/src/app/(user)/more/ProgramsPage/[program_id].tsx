import { View, Text, Dimensions, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { defaultProgramImage } from '@/src/components/ProgramsListProgram';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { supabase } from '@/src/lib/supabase';
import { Program, ProgramFormType } from '@/src/types';
import { Button, Icon, TextInput } from 'react-native-paper';
import { useAuth } from '@/src/providers/AuthProvider';
import { initializePaymentSheet } from '@/src/lib/stripe'
import { openPaymentSheet } from '@/src/lib/stripe';
import AddToCartProgramSheet from '@/src/components/ShopComponets/AddToCartSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import TextInputForm from '@/src/components/ShopComponets/TextInputForm';
import RadioButtonForm from '@/src/components/ShopComponets/RadioButtonForm';
const ProgramInfo = () => {
    const { program_id } = useLocalSearchParams()
    const { session } = useAuth()
    const [ program, setProgram ] = useState<Program>()
    const [ programForm, setProgramForm ] = useState<ProgramFormType[]>()
    const [ visible, setVisible ] = useState(false);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = () => bottomSheetRef.current?.present();
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const Tab = useBottomTabBarHeight() + 80
    const [ isReady, setIsReady ] = useState<number[]>([])
    const { width } = Dimensions.get("window")
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const [ buttonOn, setButtonOn ] = useState(false)
    const scrollOffset = useScrollViewOffset(scrollRef)
    const tabBarHeight = useBottomTabBarHeight() + 80
    const height = Dimensions.get('screen').height - Tab
    const imageAnimatedStyle = useAnimatedStyle(() => {
      return{
        transform: [
          {
            translateY : interpolate(
            scrollOffset.value,
            [-250, 0, 250 ],
            [-250/2, 0, 250 * 0.75]
            )
          },
          {
            scale: interpolate(scrollOffset.value, [-250, 0, 250], [2, 1, 1])
          }
        ]
      }
    })

    const getInfo = async () => {
        const { data , error } = await supabase.from("programs").select("*").eq("program_id", program_id).single()
        const { data : programForms, error : programFormError} = await supabase.from('program_forms').select('*').eq('program_id', program_id)
        if( data ) {
            setProgram(data)
        }
        if( programForms ){
          setProgramForm( programForms )
        }
    }

    const handleBuyNow = async () => {
      await initializePaymentSheet(Math.floor(program?.program_price! * 100))
      await openPaymentSheet()
    }

    const addToCart = async () => {
      const { error } = await supabase.from('user_cart').insert({ user_id : session?.user.id, program_id: program?.program_id, produt_quantity : 1 })
    }
    useEffect(() => {
        getInfo()
    }, [])
    useEffect(() => {
      if( isReady.length == programForm?.length){
        setButtonOn(true)
      }else{
        setButtonOn(false)
      }
    }, [isReady])
  return (
    <View className='flex-1 bg-white pt-[15%]' style={{flexGrow: 1}}>
    <Stack.Screen options={ { title : "Details", headerTransparent: true, headerRight : () => (
        <Link href={`more/UserCart/${session?.user.id}`} asChild>
            <Pressable className='border items-center p-2 ' style={{ borderWidth : 2 , borderRadius : 50 }}>
                    <Icon source={"cart-outline"} size={25}/> 
            </Pressable>
        </Link>
        )}}  />
     <Animated.ScrollView ref={scrollRef}  scrollEventThrottle={16} contentContainerStyle={{justifyContent: "center", alignItems: "center", marginTop: "14%" }} >
         
         <Animated.Image 
           source={ { uri: program?.program_img || defaultProgramImage } }
           style={ [{width: width / 2, height: 200, borderRadius: 8 }, imageAnimatedStyle] }
           resizeMode='stretch'
         />
        
        <View className='flex-row justify-between w-[100%] px-5 bg-white'>
            <Text className='text-black font-bold text-xl w-[50%]'>{program?.program_name}</Text>
            <Text className='text-[#57BA47] font-bold text-lg w-[50%] text-center'>${program?.program_price}<Text className='text-black text-md'> / Month</Text> </Text>
        </View>
        <View className='flex-1 ' style={{ height : height }}>
          <ScrollView className='pt-5 w-[100%]  bg-white' contentContainerStyle={{ alignItems : 'center' }} >
                { programForm ? programForm.map((item, index) => {
                  if( item.question_type == 'text_input' ) {
                    return <View><TextInputForm item={item} setIsReady={setIsReady} isReady={isReady} index={index}/></View>
                  }
                  else if( item.question_type == 'radio_button' ){
                    return <RadioButtonForm item={item} index={index} setIsReady={setIsReady} isReady={isReady} />
                  }
                }) : <></>}
                <View className='flex-row justify-between px-3 w-[100%]'>
                  <View className='flex-row'> 
                      <Button mode='contained' style={{ backgroundColor : "gray" }} icon={ () => <Icon source={"cart-outline"} size={20}/>} onPress={handlePresentModalPress} disabled={!buttonOn}>Add to Cart</Button>
                  </View>
                  <Button mode='contained' style={{ backgroundColor : '#57BA47' }} onPress={handleBuyNow}>Buy Now</Button>
                </View>
          </ScrollView>
        </View>
        <View style={{ height : Tab }}></View>
     </Animated.ScrollView>
     <AddToCartProgramSheet ref={bottomSheetRef} program_id={program?.program_id!} program_img={program?.program_img!} program_price={program?.program_price!}  program_name={program?.program_name!} program_speaker={program?.program_speaker!} />
     </View>
  )
}

export default ProgramInfo