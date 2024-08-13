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
        <Link  href={`/myPrograms/playlists/${playlist.playlist_id}`} asChild className='items-center h-[170] w-[100%]'>
            <TouchableOpacity>
                <View className='flex-col item-center px-2'>
                    <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15, width: "30%"}}>
                                <Image 
                                    source={{ uri: playlist.playlist_img || defaultProgramImage }}
                                    style={{width: 160, height: 140, objectFit: "fill", borderRadius: 8}}
                                />
                    </View>
                    <View className='items-center justify-center w-[70%]'>
                        <Text className='text-xl font-bold' numberOfLines={1} allowFontScaling adjustsFontSizeToFit> {playlist.playlist_name} </Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        </Link>
  )
}

export default RenderUserPlaylist