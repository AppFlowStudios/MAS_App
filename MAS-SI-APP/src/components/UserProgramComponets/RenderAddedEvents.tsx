import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Program } from '../../types'
import { Link } from "expo-router"
import { useProgram } from '../../providers/programProvider'
import { defaultProgramImage } from '../ProgramsListProgram'
import RenderMyLibraryProgramLectures from './RenderMyLibraryProgramLectures'
import { useAuth } from "@/src/providers/AuthProvider"
import { supabase } from '@/src/lib/supabase'
import { EventsType } from '../../types'
type RenderEventProp = {
    event_id: string
}
const RenderMyLibraryProgram = ( {event_id} : RenderEventProp) => {
  const { session } = useAuth()
  const [ event, setEvent] = useState<EventsType>()
  async function fetchUserProgram(){
    const { data, error } = await supabase.from("events").select("*").eq("event_id ",  event_id).single()
    if(error){
      console.log(error)
    }
    if(data){
    setEvent(data)
    console.log(data)
    }
  }

  useEffect(() => {
    fetchUserProgram()
  }, [session])


  return (
    <View style={{ width: 170, height: 200, justifyContent: "center", alignItems: "center", marginHorizontal: 8}} className=''>
        <Link  href={`../myPrograms/}`}  asChild>
            <TouchableOpacity className=''>
            <View style={{width: 170, height: 170}}>
                    <Image source={{uri: event?.event_img || defaultProgramImage }} style={{width : "100%", height: "100%",borderRadius: 8}}/>
            </View>
            <View className='flex-col'>
                <Text className='text-black font-bold'>{event?.event_name}</Text>
                <Text className='text-gray-500'>{event?.event_speaker}</Text>
            </View>
            </TouchableOpacity>
        </Link>
    </View>
  )
}

export default RenderMyLibraryProgram