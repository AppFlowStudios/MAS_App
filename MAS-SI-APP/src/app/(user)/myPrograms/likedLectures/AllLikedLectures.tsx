import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
const AllLikedLectures = () => {
  const { session } = useAuth()

  async function fetchLikedPrograms(){
    const { data, error } = await supabase.from("liked_lectures").select("lecture_id").eq("user_id", session?.user.id)
    if( error ){
        console.log(error)
    }
    if(data){
        console.log(data)
    }
  }

  useEffect(() => {
    fetchLikedPrograms()
  }, [])
  return (
    <View>
      <Text>AllLikedLectures</Text>
    </View>
  )
}

export default AllLikedLectures