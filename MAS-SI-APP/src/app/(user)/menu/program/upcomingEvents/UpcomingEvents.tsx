import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Button, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '@/src/lib/supabase'
import { EventsType, Program } from '@/src/types'
import { Link } from 'expo-router'
import ProgramsListProgram, { defaultProgramImage } from '@/src/components/ProgramsListProgram'
import  Swipeable, { SwipeableProps }  from 'react-native-gesture-handler/Swipeable';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Icon, Searchbar } from 'react-native-paper'
import RenderEvents from '@/src/components/EventsComponets/RenderEvents'
import UpcomingProgramFliers, { UpcomingKidsFliers } from '@/src/components/UpcomingFliers'
import { UpcomingEventFliers } from '@/src/components/UpcomingFliers'
const UpcomingEvents = ({  navigation } : any) => {
  const [ eventsUpcoming, setEventsUpcoming ] = useState<EventsType[] | null>()
  const [ programsUpcoming, setProgramsUpcoming ]= useState<Program[] | null>()
  const [ kidsUpcoming, setKidsUpcoming ] = useState<Program[] | null>() 
  const [ searchBarInput, setSearchBarInput ] = useState("")
  const tabBarHeight = useBottomTabBarHeight()
  
  const getUpcomingKids = async () => {
    const { data, error } = await supabase.from("programs").select("*").eq("is_kids", true)
    if ( error ){
      console.log( error )
    }
    if( data ){
      setKidsUpcoming(data)
    }
  }
  const getUpcomingEvent =  async () => {
    const currDate = new Date().toISOString()
    console.log(currDate)
    const { data, error } = await supabase.from("events").select("*").gte("event_start_date", currDate)
    if( error ){
      console.log(error)
    }
    if( data ) {
      setEventsUpcoming(data)
    }
  }

  const getUpcomingPrograms = async () => {
    const currDate = new Date().toISOString()
    const { data, error } = await supabase.from("programs").select("*").gte("program_end_date", currDate)
    if( error ){
      console.log( error )
    }
    if ( data ){
      setProgramsUpcoming(data)
    }
  }
  useEffect(() => {
    getUpcomingEvent()
    getUpcomingPrograms()
    getUpcomingKids()
    const listenForUpcomingEvents = supabase.channel("upcoming").on(
      "postgres_changes",
      {
        event: "*",
        schema : "public",
        table: "events",
      },
      (payload) => getUpcomingEvent()
    )
    .subscribe()

    const listenForUpcomingPrograms = supabase.channel("upcoming programs").on(
      "postgres_changes",
      {
        event: "*",
        schema : "public",
        table: "programs",
      },
      (payload) => getUpcomingPrograms()
    )
    .subscribe()

    return () => { supabase.removeChannel(listenForUpcomingEvents); supabase.removeChannel(listenForUpcomingPrograms)}
  }, [])

  
  
  return (
    <View className=' bg-[#0D509D] flex-1' >
    <View  className='bg-white pt-2 mt-1 flex-1'style={{borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingBottom: tabBarHeight }}>
    <Searchbar placeholder='Search...' onChangeText={setSearchBarInput} value={searchBarInput} className='mt-2 w-[95%] mb-2' style={{alignSelf : "center", justifyContent: "center"}} elevation={1}/>
    <ScrollView>
      <View>
        <Text className='text-center font-bold text-[#b7b7b7] text-lg'>Stay up to date with your Community</Text>
      </View>
      <View className='flex-col'>
      { kidsUpcoming && kidsUpcoming.length > 1 ? 
          <View>
            <Pressable onPress={() => navigation.jumpTo("Kids")} className='flex-row items-center justify-between'><Text className='text-3xl font-bold text-black'> Upcoming Kids Programs</Text><Icon source={"chevron-right"} color='gray' size={25}/><View className=''/></Pressable>
            <FlatList 
              data={kidsUpcoming}
              renderItem={( {item} ) => <View className='px-3'><UpcomingKidsFliers kids={item}/></View>}
              contentContainerStyle={{ paddingHorizontal : 10, paddingVertical : 2 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View> 
        : <></>
        }

        { eventsUpcoming && eventsUpcoming.length > 1 ? 
          <View>
            <Pressable onPress={() => navigation.jumpTo("Events")} className='flex-row items-center justify-between'><Text className='text-3xl font-bold text-black'> Upcoming Events</Text><Icon source={"chevron-right"} color='gray' size={25}/><View className=''/></Pressable>
            <FlatList 
              data={eventsUpcoming}
              renderItem={( {item} ) => <View className=' px-3'><UpcomingEventFliers event={item}/></View>}
              contentContainerStyle={{ paddingHorizontal : 10, paddingVertical : 2 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View> 
        : <></>
        }


        {programsUpcoming &&  programsUpcoming.length > 1 ? 
            <View> 
            <Pressable onPress={() => navigation.jumpTo("Programs & Tarbiya")} className='flex-row items-center justify-between'><Text className='text-3xl font-bold text-black'> Upcoming Programs</Text><Icon source={"chevron-right"} color='gray' size={25}/><View className=''/></Pressable>
            <View className='mt-2'/>
              <FlatList 
              data={programsUpcoming}
              renderItem={( {item} ) => <View className=' px-3'><UpcomingProgramFliers program={item}/></View>}
              contentContainerStyle={{ paddingHorizontal : 10, paddingVertical : 2 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              />
            </View>
          : <></>
        }
      </View>
    </ScrollView>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  dot: {
    width: 4,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#bbb',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});

export default UpcomingEvents