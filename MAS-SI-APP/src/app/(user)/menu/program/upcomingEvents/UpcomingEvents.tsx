import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '@/src/lib/supabase'
import { EventsType, Program } from '@/src/types'
import { Link } from 'expo-router'
import { defaultProgramImage } from '@/src/components/ProgramsListProgram'
import  Swipeable, { SwipeableProps }  from 'react-native-gesture-handler/Swipeable';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Searchbar } from 'react-native-paper'
const UpcomingEvents = () => {
  const [ eventsUpcoming, setEventsUpcoming ] = useState<EventsType[] | null>()
  const [ programsUpcoming, setProgramsUpcoming ]= useState<Program[] | null>()
  const [ searchBarInput, setSearchBarInput ] = useState("")
  const [ isSwiped, setIsSwiped ] = useState(false);
  const swipeableRef = useRef<Swipeable>(null);
  const tabBarHeight = useBottomTabBarHeight()
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
  }, [])

  const rightSideButton = () => {
    return (
    <View>
      <Text>Button</Text>
    </View>
  )
  }

  return (
    <View className=' bg-[#0D509D] flex-1' >
    <View  className='bg-white pt-2 mt-1 flex-1'style={{borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingBottom: tabBarHeight }}>
    <Searchbar placeholder='Search...' onChangeText={setSearchBarInput} value={searchBarInput} className='mt-2 w-[95%] mb-2' style={{alignSelf : "center", justifyContent: "center"}} elevation={1}/>
    <ScrollView>
      <View className='flex-col'>
        { eventsUpcoming ? 
          <View>
            <Text className='text-3xl font-bold text-black'> Upcoming Events</Text>

            <View>
              { eventsUpcoming.map((item, index) => {
                return(
                  <View style={{ width: "100%", height: 120, marginHorizontal: 3}} className='' key={index}>
                    <Link  href={"/"} asChild>
                    <TouchableOpacity className=''>
                        <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center"}}>

                            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15}} className=''>
                                <Image 
                                    source={{ uri: item.event_img || defaultProgramImage }}
                                    style={{width: 130, height: 100, objectFit: "cover", borderRadius: 15}}
                                    className=''
                                />
                            </View>
                            <View>
                                <Swipeable
                                    ref={swipeableRef}
                                    renderRightActions={rightSideButton}
                                    containerStyle={{flexDirection:"row"}}
                                    onSwipeableOpen={() => setIsSwiped(true)}
                                    onSwipeableClose={() => setIsSwiped(false)}
                                >
                                    <View className='mt-2 items-center justify-center bg-white' style={{height: "80%", borderRadius: 20, marginLeft: "10%", width: 200}}>
                                        <Text style={{textAlign: "center", fontWeight: "bold"}}>{item.event_name}</Text>
                                        <Text style={{textAlign: "center"}}>By: {item.event_speaker}</Text>
                                    </View>
                                </Swipeable>
                                <View className='flex-row justify-center top-0'>
                                    <View style={[styles.dot, !isSwiped ? styles.activeDot : null]} />
                                    <View style={[styles.dot, isSwiped ? styles.activeDot : null]} />
                            </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>
              </View>
                )
              })}
            </View>
          </View>
        : <></>
        }


        {
          programsUpcoming ? 
            <View> 
              <Text className='text-3xl font-bold text-black'> Upcoming Programs</Text>

              <View>
                { programsUpcoming.map((item, index) => {
                  return(
                    <View style={{ width: "100%", height: 120, marginHorizontal: 3}} className='' key={index}>
                    <Link  href={"/"} asChild>
                    <TouchableOpacity className=''>
                        <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center"}}>

                            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15}} className=''>
                                <Image 
                                    source={{ uri: item.program_img || defaultProgramImage }}
                                    style={{width: 130, height: 100, objectFit: "cover", borderRadius: 15}}
                                    className=''
                                />
                            </View>
                            <View>
                                <Swipeable
                                    ref={swipeableRef}
                                    renderRightActions={rightSideButton}
                                    containerStyle={{flexDirection:"row"}}
                                    onSwipeableOpen={() => setIsSwiped(true)}
                                    onSwipeableClose={() => setIsSwiped(false)}
                                >
                                    <View className='mt-2 items-center justify-center bg-white' style={{height: "80%", borderRadius: 20, marginLeft: "10%", width: 200}}>
                                        <Text style={{textAlign: "center", fontWeight: "bold"}}>{item.program_name}</Text>
                                        <Text style={{textAlign: "center"}}>By: {item.program_speaker}</Text>
                                    </View>
                                </Swipeable>
                                <View className='flex-row justify-center top-0'>
                                    <View style={[styles.dot, !isSwiped ? styles.activeDot : null]} />
                                    <View style={[styles.dot, isSwiped ? styles.activeDot : null]} />
                            </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>
              </View>
                  )
                })}
              </View>
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