import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from "expo-router"
import { defaultProgramImage } from '../ProgramsListProgram'
import { UserPlaylistType } from '@/src/types'
type RenderUserPlaylistProp = {
    playlist : UserPlaylistType
}
const RenderUserPlaylist = ({ playlist } : RenderUserPlaylistProp) => {
  return (
    <View className='h-[120] w-[100%]'>
        <Link  href={`/myPrograms/playlists/${playlist.playlist_id}`} asChild>
            <TouchableOpacity>
                <View className='flex-row item-center px-2'>
                    <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15, width: "30%"}} className=''>
                                <Image 
                                    source={{ uri: playlist.playlist_img || defaultProgramImage }}
                                    style={{width: 130, height: 100, objectFit: "fill", borderRadius: 8}}
                                />
                    </View>
                    <View className='items-center justify-center w-[70%]'>
                        <Text className='text-xl font-bold'> {playlist.playlist_name} </Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        </Link>
    </View>
  )
}

export default RenderUserPlaylist