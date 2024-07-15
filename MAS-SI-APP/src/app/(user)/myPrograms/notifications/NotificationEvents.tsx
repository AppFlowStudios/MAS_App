import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import{ useAuth } from "@/src/providers/AuthProvider"
import { EventsType } from '@/src/types'
import RenderAddedEvents from "@/src/components/UserProgramComponets/RenderAddedEvents" 
const NotificationEvents = () => {
  const { session } = useAuth()
  const [ addedEvents, setAddedEvents ] = useState<EventsType[] | null>(null)
  const getAddedEvents = async () => {
    const { data ,error } = await supabase.from("added_notifications").select("*").eq("user_id", session?.user.id)
    if( error ){
        console.log( error)
    }
    if( data ){
        setAddedEvents(data)
    }
  }

  useEffect(() => {
    getAddedEvents()
},[])
  return (
    <View className='bg-white flex-1'>
      <Stack.Screen options={{title : 'Notification Center'}}/>
      <View className='flex-row w-[100%] flex-wrap justify-center mt-5' > 
        {addedEvents ? addedEvents.map((event, index) => {
          return(
            <View className='pb-5' key={index}>
              <RenderAddedEvents event_id={event.event_id} />
            </View>
          )
        }) : <></>}
      </View>
    </View>
  )
}

export default NotificationEvents