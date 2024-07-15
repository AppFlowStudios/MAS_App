import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/src/providers/AuthProvider'
import { supabase } from '@/src/lib/supabase'
import { EventsType } from '@/src/types'
import { FlatList } from 'react-native'
import RenderEvents from '@/src/components/EventsComponets/RenderEvents'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Divider, Searchbar } from "react-native-paper"
const Event = () => {
  const tabBarHeight = useBottomTabBarHeight() + 35
  const [ eventsData, setEventsData ] = useState<EventsType[]>()
  const [ searchBarInput, setSearchBarInput ] = useState("")
  const filterTestFunc = () => {

  }
  const  fetchEventsData =  async () => {
    const { data, error } = await supabase.from("events").select("*")
    if( error ) {
      console.log(error)
    }
    if( data ){
      setEventsData(data)
    }
  }


  useEffect(() => {
    fetchEventsData()
  }, [])
  return (
    <View className='bg-[#0D509D] flex-1 '>
      <View className='bg-white pt-2 mt-1 flex-1'style={{borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingBottom: tabBarHeight }}>
      <Searchbar placeholder='Search...' onChangeText={filterTestFunc} value={searchBarInput} className='mt-2 w-[95%] mb-2' style={{alignSelf : "center", justifyContent: "center"}} elevation={1}/>
      <View className='mb-5'/>
      <FlatList 
          data={eventsData}
          renderItem={({item}) => <RenderEvents event={item}/>}
          ItemSeparatorComponent={() => <Divider style={{width: "50%", alignSelf: "center", height: 1}}/>}
          contentContainerStyle={{rowGap: 15}}
        />
      </View>
    </View>
  )
}

export default Event