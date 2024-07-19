import { View, Text, FlatList, Pressable, ScrollView, StatusBar, } from 'react-native'
import React, { useEffect, useState } from 'react'
import RenderMyLibraryProgram from '@/src/components/UserProgramComponets/renderMyLibraryProgram';
import { useAuth } from '@/src/providers/AuthProvider';
import { supabase } from '@/src/lib/supabase';
import { Program } from '@/src/types';
import { Divider, Icon } from 'react-native-paper';
import { Link } from 'expo-router';
import RenderLikedLectures from '@/src/components/UserProgramComponets/RenderLikedLectures';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
export default function userPrograms() {
  const { session } = useAuth()
  type program_id  = {
    program_id : string
  }
  const [ userPrograms, setUserPrograms ] = useState<program_id[]>()
  async function getUserProgramLibrary(){
    const {data, error} = await supabase.from("added_programs").select("program_id").eq("user_id", session?.user.id)
    if(error){
      console.log(error)
    }
    if(data){
      setUserPrograms(data)
    }
  }

  useEffect(() => {
    getUserProgramLibrary()
  }, [session])
  const tabBarHeight = useBottomTabBarHeight() + 35
  return (
    <ScrollView className='bg-white flex-1 w-[100%]' >
      <StatusBar barStyle={"dark-content"}/>
      <View className='ml-2 mt-[15%]'>
        <Text className='text-3xl font-bold'>My Library</Text>
      </View>
      <View className='flex-row items-center ml-2 mt-2 '>
        <Link href={"/myPrograms/PlaylistIndex"} asChild>
        <Pressable className='flex-row items-center'>
          <Icon source={"playlist-play"} color='#0D509D' size={30}/>
          <Text className='text-xl font-bold px-[13]'>Playlists</Text>
        </Pressable>
        </Link>
      </View> 
      <Divider style={{marginTop : 2}}/>
      <View className='flex-row items-center ml-2 mt-2'>
        <Link href={"/myPrograms/notifications/NotificationEvents"} asChild>
        <Pressable className='flex-row items-center'>
          <Icon source={"bell"} color='#0D509D' size={30}/>
          <Text className='text-xl font-bold px-[13]'>Notifications</Text>
        </Pressable>
        </Link>
      </View> 
      <Divider className='mb-3 mt-2'/>

      <View className='flex-row w-[100%] flex-wrap justify-center mt-5' style={{ paddingBottom : tabBarHeight }} > 
        {userPrograms ? userPrograms.map((program, index) => {
          return(
            <View className='pb-5 justify-between mx-2' key={index}>
              <RenderMyLibraryProgram program_id={program.program_id} />
            </View>
          )
        }) : <></>}
      </View>


    </ScrollView>
  )
}