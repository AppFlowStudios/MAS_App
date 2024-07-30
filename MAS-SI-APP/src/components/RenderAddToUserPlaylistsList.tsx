import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { UserPlaylistType } from '../types'
import { defaultProgramImage } from './ProgramsListProgram'
import { useAuth } from '../providers/AuthProvider'
import { supabase } from '../lib/supabase'
import { Icon, ToggleButton } from 'react-native-paper'
type RenderAddToUserPlaylistsListProp = {
    playlist : UserPlaylistType
    lectureToBeAdded : string
    setAddToPlaylistVisible : ( addToPlaylistVisible : boolean ) => void
    setPlaylistAddingTo : ( playlistAddingTo : string[]) => void
    playListAddingTo : string[] | undefined
}


const RenderAddToUserPlaylistsListProgram = ( { playlist, lectureToBeAdded, setAddToPlaylistVisible, setPlaylistAddingTo, playListAddingTo } : RenderAddToUserPlaylistsListProp ) => {
  const { session } = useAuth()
  const [status, setStatus ] = useState<"checked" | "unchecked" | undefined>("unchecked")
  const handlePress = async () => {
    const { error } = await supabase.from("user_playlist_lectures").insert({user_id : session?.user.id, playlist_id : playlist.playlist_id, program_lecture_id : lectureToBeAdded })
    if( error ){
      console.log( error )
    }
    setAddToPlaylistVisible(false)
  }
  const onButtonToggle = () => {
    if( status == "checked") {
      if( playListAddingTo ){
        const setPlaylist = playListAddingTo?.filter(id => id !== playlist.playlist_id)
        setPlaylistAddingTo(setPlaylist)
      }
    }
    else if( playListAddingTo){
    setPlaylistAddingTo([...playListAddingTo, playlist.playlist_id])
    }
    else{
      setPlaylistAddingTo([playlist.playlist_id])
    }
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };
  return (
    <TouchableOpacity className='flex-row items-center' onPress={onButtonToggle}>
      { status  == "unchecked" ? <Icon source={"checkbox-blank-circle-outline"}  color='gray' size={25}/> : <Icon source={"checkbox-marked-circle"} color='#007AFF' size={25} />}
        <View className=' ml-2'>
           <Image source={{ uri : playlist.playlist_img || defaultProgramImage}} style={{width : 60, height : 60, objectFit: "contain", borderRadius: 10}}/>
        </View>
        <Text className='text-xl font-bold'> {playlist.playlist_name} </Text>
    </TouchableOpacity>
  )
}

export const RenderAddToUserPlaylistsListEvent = ( { playlist, lectureToBeAdded, setAddToPlaylistVisible, setPlaylistAddingTo, playListAddingTo } : RenderAddToUserPlaylistsListProp ) => {
  const { session } = useAuth()
  const [status, setStatus ] = useState<"checked" | "unchecked" | undefined>("unchecked")
  const handlePress = async () => {
    const { error } = await supabase.from("user_playlist_lectures").insert({user_id : session?.user.id, playlist_id : playlist.playlist_id, event_lecture_id : lectureToBeAdded })
    if( error ){
      console.log( error )
    }
    setAddToPlaylistVisible(false)
  }
  const onButtonToggle = () => {
    if( status == "checked") {
      if( playListAddingTo ){
        const setPlaylist = playListAddingTo?.filter(id => id !== playlist.playlist_id)
        setPlaylistAddingTo(setPlaylist)
      }
    }
    else if( playListAddingTo ){
    setPlaylistAddingTo([...playListAddingTo, playlist.playlist_id])
    }
    else{
      setPlaylistAddingTo([playlist.playlist_id])
    }
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };
  return (
    <TouchableOpacity className='flex-row items-center' onPress={onButtonToggle}>
        { status  == "unchecked" ? <Icon source={"checkbox-blank-circle-outline"}  color='gray' size={25}/> : <Icon source={"checkbox-marked-circle"} color='#007AFF' size={25} />}  
        <View className=' ml-2'>
           <Image source={{ uri : playlist.playlist_img || defaultProgramImage}} style={{width : 60, height : 60, objectFit: "contain", borderRadius: 10}}/>
        </View>
        <Text className='text-xl font-bold'> {playlist.playlist_name} </Text>
    </TouchableOpacity>
  )
}
export default RenderAddToUserPlaylistsListProgram