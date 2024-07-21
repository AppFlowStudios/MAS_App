import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import{ useAuth } from "@/src/providers/AuthProvider"
import { EventsType, Program } from '@/src/types'
import RenderAddedEvents from "@/src/components/UserProgramComponets/RenderAddedEvents" 
import ProgramsListProgram from '@/src/components/ProgramsListProgram'
import RenderAddedPrograms from '@/src/components/UserProgramComponets/RenderAddedPrograms'
const NotificationEvents = () => {
  const { session } = useAuth()
  const [ addedEvents, setAddedEvents ] = useState<EventsType[] | null>(null)
  const [ addedPrograms, setAddedPrograms ] = useState<Program[] | null>(null)
  const getAddedEvents = async () => {
    const { data ,error } = await supabase.from("added_notifications").select("*").eq("user_id", session?.user.id)
    if( error ){
        console.log( error)
    }
    if( data ){
        setAddedEvents(data)
    }
  }

  const getAddedProgram = async () => {
    const { data, error } = await supabase.from("added_notifications_programs").select("*").eq("user_id", session?.user.id)
    if( error ){
      console.log( error )
    }
    if( data ){
      setAddedPrograms(data)
    }
  }
  useEffect(() => {
    getAddedEvents()
    getAddedProgram()
    const listenForAddedEvents = supabase.channel("added notifications").on(
      "postgres_changes",
      {
        event: '*',
        schema : "public",
        table: "added_notifications"
      },
      (payload) => getAddedEvents()
    )
    .subscribe()

    const listenForAddedPrograms = supabase.channel("added notifications programs").on(
      "postgres_changes",
      {
        event: '*',
        schema : "public",
        table: "added_notifications_programs"
      },
      (payload) => getAddedProgram()
    )
    .subscribe()
    return () => { supabase.removeChannel( listenForAddedEvents ) ; supabase.removeChannel(listenForAddedPrograms)}
},[])
  return (
    <ScrollView className='bg-white flex-1'>
      <Stack.Screen options={{title : 'Notification Center', headerBackTitleVisible : false}}/>
      <View className='flex-col w-[100%] flex-wrap justify-center mt-5' >
        <View>
          <Text className='text-2xl font-bold'>Events :</Text>
        </View> 

        <View className='mt-2 flex-row w-[100%] flex-wrap justify-center' >
        {addedEvents ? addedEvents.map((event, index) => {
          return(
            <View className='pb-5 justify-between mx-2' key={index}>
              <RenderAddedEvents event_id={event.event_id} />
            </View>
          )
        }) : <></>}
        </View>


        <View>
          <Text className='text-2xl font-bold'>Programs :</Text>
        </View> 

        <View className='mt-2 flex-row w-[100%] flex-wrap justify-center' >
        {addedPrograms ? addedPrograms.map((program, index) => {
          return(
            <View className='pb-5 justify-between mx-2' key={index}>
              <RenderAddedPrograms program_id={program.program_id} />
            </View>
          )
        }) : <></>}
        </View>

      </View>
    </ScrollView>
  )
}

export default NotificationEvents