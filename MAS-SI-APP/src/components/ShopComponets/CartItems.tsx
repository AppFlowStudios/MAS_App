import { View, Text, Image, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultProgramImage } from '../ProgramsListProgram'
import { supabase } from '@/src/lib/supabase'
import { EventsType, Program } from '@/src/types'
import { Button, Icon } from 'react-native-paper'

type CartProgramItemsProp = {
    program_id : string
    product_quantity : number
    setTotal : ( total : number ) => void
    total : number
}
const CartProgramItems = ({program_id, product_quantity, setTotal, total} : CartProgramItemsProp) => {
  const [ program, setProgram ] = useState<Program>()
  const [ quantity, setQuantity ] = useState(product_quantity)
  const getProgram = async () => {
    const { data, error } = await supabase.from('programs').select('*').eq('program_id', program_id).single()
    if( data ){
        setProgram(data)
    }
    if( error ){
        console.log(error )
    }
  }   
  useEffect(() => {
    getProgram()
  },[])

  useEffect(() => {
    const calculatePrice = program?.program_price! * quantity
    console.log(calculatePrice)
    setTotal(total + calculatePrice)
  }, [quantity])
  console.log(total)
  return (
    <View style={{ width: "95%", height: 120, backgroundColor : '#E5E4E2', alignItems : 'center', alignSelf : 'center', borderRadius : 10 }} className='mt-2'>
        <View style={{flexDirection: "row",alignItems : 'center', justifyContent: "center", height  : '100%', paddingHorizontal : 10, width : '100%'}} >
            <View style={{justifyContent: "center", alignItems: "center", borderRadius: 15, width : '40%', height  : '95%'}}>
                <Image 
                source={{ uri: program?.program_img || defaultProgramImage }}
                style={{width: '100%', height: '100%', objectFit: "cover", borderRadius: 15}}                                    
                />
            </View>
            <View style={{ flex : 1, flexDirection : 'column', height : '100%' }} className=''>
                <View className='flex-row justify-between items-center ml-2' style={{ height : '50%' }}>
                    <Text className='text-xl font-bold text-black'>{program?.program_name}</Text>
                    <Icon source={'trash-can-outline'} size={20}  color='gray'/>
                </View>
                <View className='ml-1 flex-row items-center justify-between' style={{ height : '50%' }}>
                        <Text className='text-md font-bold'><Text className='text-[#57BA47]'>${program?.program_price}</Text>/Month</Text>
                        <View className='flex-row '>
                            <View className='items-center flex-row justify-center'>
                                <Pressable className='bg-white' style={{ borderTopLeftRadius : 10, borderBottomLeftRadius : 10}} onPress={() => setQuantity(quantity => Math.max(1, quantity - 1))}><Icon source={'minus'} size={20} color='black'/></Pressable>
                                    <View className='w-[60] justify-center items-center h-[20]'><Text className='text-black'>{quantity}</Text></View>
                                <Pressable className='bg-[#57BA47]' style={{ borderTopRightRadius : 10, borderBottomRightRadius : 10 }} onPress={() => setQuantity(quantity => quantity + 1)}><Icon source={'plus'} size={20} color='white'/></Pressable>
                            </View>
                        </View>
                </View>
            </View>
        </View>                                                              
     </View>
    )
}


type CartEventItemsProp = {
    event_id : string
    product_quantity : number
    setTotal : ( total : number ) => void
    total : number
}
export const CartEventItems = ({event_id, product_quantity, setTotal, total} : CartEventItemsProp) => {
    const [ event, setEvent ] = useState<EventsType>()
    const [ quantity, setQuantity ] = useState(1)
    const getProgram = async () => {
      const { data, error } = await supabase.from('events').select('*').eq('event_id', event_id).single()
      if( data ){
          setEvent(data)
      }
      if( error ){
          console.log(error )
      }
    }   
    useEffect(() => {
      getProgram()
    },[])
    useEffect(() => {
      setTotal(total + (event?.event_price! * product_quantity))
    }, [event!])
    return (
      <View style={{ width: "95%", height: 120, backgroundColor : '#E5E4E2', alignItems : 'center', alignSelf : 'center', borderRadius : 10 }} className='mt-4'>
          <View style={{flexDirection: "row",alignItems : 'center', justifyContent: "center", height  : '100%', paddingHorizontal : 10, width : '100%'}} >
              <View style={{justifyContent: "center", alignItems: "center", borderRadius: 15, width : '40%', height  : '95%'}}>
                  <Image 
                  source={{ uri: event?.event_img || defaultProgramImage }}
                  style={{width: '100%', height: '100%', objectFit: "cover", borderRadius: 15}}                                    
                  />
              </View>
              <View style={{ flex : 1, flexDirection : 'column', height : '100%' }} className=''>
                  <View className='flex-row justify-between items-center ml-2' style={{ height : '50%' }}>
                      <Text className='text-xl font-bold text-black'>{event?.event_name}</Text>
                      <Icon source={'trash-can-outline'} size={20}  color='gray'/>
                  </View>
                  <View className='ml-1 flex-row items-center justify-between' style={{ height : '50%' }}>
                          <Text className='text-md font-bold'><Text className='text-[#57BA47]'>${event?.event_price}</Text>/Month</Text>
                          <View className='flex-row '>
                              <View className='items-center flex-row justify-center'>
                                  <Pressable className='bg-white' style={{ borderTopLeftRadius : 10, borderBottomLeftRadius : 10}} onPress={() => setQuantity(quantity => Math.max(1, quantity - 1))}><Icon source={'minus'} size={20} color='black'/></Pressable>
                                  <View className='w-[60] justify-center items-center  h-[20]'><Text className='text-black'>{product_quantity}</Text></View>
                                  <Pressable  className='bg-[#57BA47]' style={{ borderTopRightRadius : 10, borderBottomRightRadius : 10 }} onPress={() => setQuantity(quantity + 1)}><Icon source={'plus'} size={20} color='white'/></Pressable>
                              </View>
                          </View>
                  </View>
              </View>
          </View>                                                              
       </View>
      )
  }
export default CartProgramItems