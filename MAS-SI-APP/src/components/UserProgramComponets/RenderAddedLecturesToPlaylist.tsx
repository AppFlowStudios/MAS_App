import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import { Lectures } from '@/src/types'
type RenderAddedProgramLecturesProp = {
    program_lecture_id : string
}
const RenderAddedProgramLectures = ( {program_lecture_id} : RenderAddedProgramLecturesProp) => {
  const [ lecture, setLecture ] = useState<Lectures>()
  const getLectureInfo = async () => {
    const { data , error } = await supabase.from("program_lectures").select("*").eq("lecture_id", program_lecture_id).single()
    if ( error ){
        console.log( error )
    }
    if( data ){
        setLecture(data)
    }
  }
  
  return (
    <View>
      <Text>RenderAddedProgramLectures</Text>
    </View>
  )
}
type RenderAddedEventLecturesProp = {
  event_lecture_id : string
}
export const RenderAddedEventLectures = ( {event_lecture_id} : RenderAddedEventLecturesProp) => {
  const [ lecture, setLecture ] = useState<Lectures>()
  const getLectureInfo = async () => {
    const { data , error } = await supabase.from("events_lecture").select("*").eq("event_lecture_id", event_lecture_id).single()
    if ( error ){
        console.log( error )
    }
    if( data ){
        setLecture(data)
    }
  }
  
  return (
    <View>
      <Text>RenderAddedEventLectures</Text>
    </View>
  )
}

export default RenderAddedProgramLectures