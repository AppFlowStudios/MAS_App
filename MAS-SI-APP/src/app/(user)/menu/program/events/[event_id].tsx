import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import { EventsType } from '@/src/types'
import EventsLectureDisplay from '@/src/components/EventsComponets/EventsLectureDisplay'
import { ActivityIndicator } from 'react-native-paper'
import EventInfoDisplay from '@/src/components/EventsComponets/EventInfoDisplay'
import { Stack } from 'expo-router'
const EventInfo = () => {
  const { event_id } = useLocalSearchParams()
  const [ eventInfoData, setEventInfoData ] = useState<EventsType | null>()
  const [ eventLectures, setEventLectures ] = useState<EventsType>()
  const fetchEventInfo = async () => {
    const { data , error } = await supabase.from("events").select("*").eq("event_id", event_id).single()
    if( error ){
        console.log(error)
    }
    if( data ){
        setEventInfoData(data)
    }
  }
  

  useEffect(() => {
    fetchEventInfo()
  }, [])
  if( !eventInfoData ){
    return <ActivityIndicator />
  }

  return (
    <>
       <Stack.Screen options={{ headerBackTitleVisible : false, title : ""}}/>
        {eventInfoData?.has_lecture ?  <EventsLectureDisplay event_id={eventInfoData?.event_id} event_img={eventInfoData?.event_img} event_name={eventInfoData?.event_name} event_speaker={eventInfoData?.event_speaker}/> 
      : <EventInfoDisplay event_img={eventInfoData.event_img} event_speaker={eventInfoData.event_speaker} event_name={eventInfoData.event_name} event_desc={eventInfoData.event_desc}/>}
    </>
  )
}

export default EventInfo