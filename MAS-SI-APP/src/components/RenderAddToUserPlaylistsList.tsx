import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { UserPlaylistType } from '../types'
import { defaultProgramImage } from './ProgramsListProgram'
import { useAuth } from '../providers/AuthProvider'
import { supabase } from '../lib/supabase'
type RenderAddToUserPlaylistsListProp = {
    playlist : UserPlaylistType
    lectureToBeAdded : string
    setAddToPlaylistVisible : ( addToPlaylistVisible : boolean ) => void
}

const RenderAddToUserPlaylistsListProgram = ( { playlist, lectureToBeAdded, setAddToPlaylistVisible } : RenderAddToUserPlaylistsListProp ) => {
  const { session } = useAuth()

  const handlePress = async () => {
    const { error } = await supabase.from("user_playlist_lectures").insert({user_id : session?.user.id, playlist_id : playlist.playlist_id, program_lecture_id : lectureToBeAdded })
    if( error ){
      console.log( error )
    }
    setAddToPlaylistVisible(false)
  }
  return (
    <TouchableOpacity className='flex-row items-center' onPress={handlePress}>
        <View>
           <Image source={{ uri : playlist.playlist_img || defaultProgramImage}} style={{width : 60, height : 60, objectFit: "contain", borderRadius: 10}}/>
        </View>
        <Text className='text-xl font-bold'> {playlist.playlist_name} </Text>
    </TouchableOpacity>
  )
}

const RenderAddToUserPlaylistsListEvent = ( { playlist, lectureToBeAdded, setAddToPlaylistVisible } : RenderAddToUserPlaylistsListProp ) => {
  const { session } = useAuth()

  const handlePress = async () => {
    const { error } = await supabase.from("user_playlist_lectures").insert({user_id : session?.user.id, playlist_id : playlist.playlist_id, event_lecture_id : lectureToBeAdded })
    if( error ){
      console.log( error )
    }
    setAddToPlaylistVisible(false)
  }
  return (
    <TouchableOpacity className='flex-row items-center' onPress={handlePress}>
        <View>
           <Image source={{ uri : playlist.playlist_img || defaultProgramImage}} style={{width : 60, height : 60, objectFit: "contain", borderRadius: 10}}/>
        </View>
        <Text className='text-xl font-bold'> {playlist.playlist_name} </Text>
    </TouchableOpacity>
  )
}
export default RenderAddToUserPlaylistsListProgram