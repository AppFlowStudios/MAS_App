import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import { UserPlaylistLectureType } from '@/src/types'
const UserPlayListLectures = () => {
  const { playlist_id } = useLocalSearchParams()
  const [ userPlaylistLectures, setPlaylistLectures ] = useState<UserPlaylistLectureType[]>()
  const getUserPlaylistLectures = async () => {
    const { data, error } = await supabase.from("user_playlist_lectures").select("*").eq("playlist_id", playlist_id)
    if( error ) {
        console.log( error )
    }
    if ( data ){
        setPlaylistLectures(data)
    }
  }

  useEffect(() => {
    getUserPlaylistLectures()
    const listenForPlaylistChanges = supabase.channel("Listen for user playlist lecture changes")
    .on(
        "postgres_changes",
        {
            event: "*",
            schema : 'public',
            table: "user_playlist_lectures"
        },
        (payload) => getUserPlaylistLectures()
    )
    .subscribe()

    return () => { supabase.removeChannel(listenForPlaylistChanges) }
  }, [])
  return (
    <View>
      <Text>UserPlayList</Text>
    </View>
  )
}

export default UserPlayListLectures