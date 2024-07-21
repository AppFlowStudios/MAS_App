import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '@/src/lib/supabase'
import { EventsType, Program } from '@/src/types'
import { Link } from 'expo-router'
import ProgramsListProgram, { defaultProgramImage } from '@/src/components/ProgramsListProgram'
import  Swipeable, { SwipeableProps }  from 'react-native-gesture-handler/Swipeable';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Searchbar } from 'react-native-paper'
import RenderEvents from '@/src/components/EventsComponets/RenderEvents'

const UpcomingEvents = () => {
  const [ eventsUpcoming, setEventsUpcoming ] = useState<EventsType[] | null>()
  const [ programsUpcoming, setProgramsUpcoming ]= useState<Program[] | null>()
  const [ searchBarInput, setSearchBarInput ] = useState("")
  const [ isSwiped, setIsSwiped ] = useState(false);
  const swipeableRef = useRef<Swipeable>(null);
  const tabBarHeight = useBottomTabBarHeight()
  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
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
        table: "events",
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
      <View className='flex-col'>
        { eventsUpcoming ? 
          <View>
            <Text className='text-3xl font-bold text-black'> Upcoming Events</Text>

            
              { eventsUpcoming.map((item, index) => {
                return <RenderEvents event={item} />
              })
              }
          
          </View>
        : <></>
        }


        {
          programsUpcoming ? 
            <View> 
              <Text className='text-3xl font-bold text-black'> Upcoming Programs</Text>

              
                { 
                programsUpcoming.map((item, index) => {
                  return <ProgramsListProgram program={item} />
                })
                }
              
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