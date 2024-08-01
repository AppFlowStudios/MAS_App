import { View, Text, FlatList, Pressable, ScrollView, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import RenderMyLibraryProgram from '@/src/components/UserProgramComponets/renderMyLibraryProgram';
import { useAuth } from '@/src/providers/AuthProvider';
import { supabase } from '@/src/lib/supabase';
import { Program, UserPlaylistType } from '@/src/types';
import { Button, Divider, Icon } from 'react-native-paper';
import { Link } from 'expo-router';
import RenderLikedLectures from '@/src/components/UserProgramComponets/RenderLikedLectures';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { UserPlaylistFliers } from '@/src/components/UpcomingFliers';
import LottieView from 'lottie-react-native';
import { defaultProgramImage } from '@/src/components/ProgramsListProgram';
import { EventsType } from '@/src/types';
export default function userPrograms() {
  const { session } = useAuth()
  type program_id  = {
    program_id : string
  }
  const [ userPrograms, setUserPrograms ] = useState<program_id[]>()
  const [ userPlaylists, setUserPlaylists ] = useState<UserPlaylistType[]>()
  const [ latestFlier, setLatestFlier ] = useState<Program>()
  const [ latestFlierEvent, setLatestFlierEvent ] = useState<EventsType>()
  const [ userNotis, setUserNotis ] = useState()
  async function getUserProgramLibrary(){
    const {data, error} = await supabase.from("added_programs").select("program_id").eq("user_id", session?.user.id)
    if(error){
      console.log(error)
    }
    if(data){
      setUserPrograms(data)
    }
  }

  async function getUserPlaylists(){
    const { data , error } = await supabase.from("user_playlist").select("*").eq("user_id", session?.user.id).range(0,1)
    if( data ){
      setUserPlaylists(data)
    }
  }

  async function getLatestAddedFlier(){
    const { data : checkForProgram , error } = await supabase.from("added_notifications_programs").select("program_id").eq('user_id', session?.user.id).order('created_at', { ascending : false }).limit(1).single()
    if( checkForProgram ){
      const { data : programInfo , error } = await supabase.from("programs").select("*").eq("program_id", checkForProgram.program_id).single()
      if( programInfo ){
        setLatestFlier(programInfo)
      }
    }else{
      const { data : checkForEvent, error } = await supabase.from("added_notifications").select("event_id").eq('user_id', session?.user.id).order("created_at", { ascending : false }).limit(1).single()
      if( checkForEvent ){
        const { data : eventInfo , error } = await supabase.from("events").select("*").eq("event_id", checkForEvent.event_id).single()
        if( eventInfo ){
          setLatestFlierEvent(eventInfo)
        }
      }
    }
  }

  useEffect(() => {
    getLatestAddedFlier()
    getUserProgramLibrary()
    getUserPlaylists()
    const channel = supabase.channel("user_programs").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table : "added_programs",
      },
      (payload) => getUserProgramLibrary()
    )
    .subscribe()

    const channel2 = supabase.channel("user_playlists").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table : "user_playlist",
      },
      (payload) => getUserPlaylists()
    )
    .subscribe()

    return() => { supabase.removeChannel(channel); supabase.removeChannel(channel2) }
  }, [])
  const tabBarHeight = useBottomTabBarHeight() + 35
  return (
    <ScrollView className='bg-white flex-1 w-[100%]' >
      <StatusBar barStyle={"dark-content"}/>
      <View className='ml-2 mt-[15%]'>
        <Text className='text-3xl font-bold'>My Library</Text>
      </View>
      <View className='flex-row items-center ml-2 mt-2'>
        <Link href={"/myPrograms/PlaylistIndex"} asChild>
        <Pressable className='flex-row items-center justify-between w-[100%] pr-3'>
          <View className='flex-row items-center justify-center'>
            <Icon source={"playlist-play"} color='#0D509D' size={25}/>
            <Text className='text-xl font-bold px-[2]'>Playlists</Text>
          </View>
          <Text className='text-gray-400 text-right'>View All <Icon source={"chevron-right"} size={15} color='gray-400'/></Text>
        </Pressable>
        </Link>
      </View>
      <View className='flex-row'> 
        {userPlaylists && userPlaylists.length > 0 ? 
        (
        <View className='flex-row'> 
           <View className='mt-2'/>
              <FlatList 
              data={userPlaylists}
              renderItem={( {item} ) => <View className=' px-3'><UserPlaylistFliers playlist={item}/></View>}
              contentContainerStyle={{ paddingHorizontal : 1, paddingVertical : 2 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              />
        </View>
        ) :  <></> 
      }
      </View> 
      <Divider style={{marginTop : 2}}/>
      <View className='flex-row items-center ml-2 mt-2'>
        <Link href={"/myPrograms/notifications/NotificationEvents"} asChild>
        <Pressable className='flex-row items-center justify-between w-[100%] pr-3'>
          <View className='flex-row items-center justify-center'>
            <Icon source={"bell"} color='#0D509D' size={25}/>
            <Text className='text-xl font-bold px-[2]'>Notifications</Text>
          </View>
          <Text className='text-gray-400 text-right'>View All <Icon source={"chevron-right"} size={15} color='gray-400'/></Text>
        </Pressable>
        </Link>
      </View> 
      <View className='w-[130] h-[130] ml-2 mt-2'>
        { latestFlier ? (
          <Link  href={`/menu/program/${latestFlier.program_id}`} asChild>
              <Pressable style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15, shadowColor : "black", shadowOffset : {width : 0, height : 1}, shadowOpacity : 1, shadowRadius :1}} className=''>
              <Image 
                  source={{ uri: latestFlier.program_img || defaultProgramImage }}
                  style={{width: 130, height: 130, objectFit: "fill", borderRadius: 15}}
                  className=''
              />
              </Pressable>
          </Link>
        ) : latestFlierEvent ? (
          <Link  href={`/menu/program/events/${latestFlierEvent.event_id}`} asChild>
          <Pressable style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15, shadowColor : "black", shadowOffset : {width : 0, height : 1}, shadowOpacity : 1, shadowRadius :1}} className=''>
          <Image 
              source={{ uri: latestFlierEvent.event_img || defaultProgramImage }}
              style={{width: 130, height: 130, objectFit: "fill", borderRadius: 15}}
              className=''
          />
          </Pressable>
      </Link>
        ) : <></>
      }
      </View>
      <Divider className='mb-3 mt-2'/>
      <View className='flex-row items-center ml-2 mt-2'>
        <View className='flex-row items-center justify-between w-[100%] pr-3'>
          <View className='flex-row items-center justify-center'>
            <Icon source={"book"} color='#0D509D' size={25}/>
            <Text className='text-xl font-bold px-[2]'>Programs</Text>
          </View>
        </View>
      </View> 
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