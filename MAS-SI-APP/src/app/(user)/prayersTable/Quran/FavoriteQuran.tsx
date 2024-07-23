import { View, Text , useWindowDimensions, ScrollView} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import React, { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase';
import { useAuth } from "@/src/providers/AuthProvider"
import RenderLikedAyahs from '@/src/components/PrayerTimesComponets/RenderLikedAyahs';
import RenderLikedSurahs from '@/src/components/PrayerTimesComponets/RenderLikedSurahs';
import { Divider } from 'react-native-paper';
type likedAyahsProp = {
  surah_number : number,
  ayah_number : number
}
type likedSurahsProp = {
  surah_number : number
}
  const Ayah = () => {
    const { session } = useAuth()
    const [ likedAyahs, setLikedAyahs ] = useState<likedAyahsProp[] | null>()
    const getLikedAyahs = async () => {
      const { data , error } = await supabase.from("user_liked_ayahs").select("surah_number, ayah_number").eq("user_id", session?.user.id)
      if( error ){
        alert(error.message)
      }
      if( data ){
        setLikedAyahs(data)
      }
    }

    useEffect(() => {
      getLikedAyahs()
      const listenForLikedAyahs = supabase.channel(" Liked Ayah Channel ").on(
        "postgres_changes",
        {
            event: "*",
            schema : "public",
            table : "user_liked_ayahs"
        },
        (payload) => getLikedAyahs()
    ).subscribe()

    return () => { supabase.removeChannel( listenForLikedAyahs ) }
    }, [])

    if( !likedAyahs ){
      return <></>
    }
    return(
          <ScrollView className='bg-white flex-1'>
            {likedAyahs ? likedAyahs.map((item, index) => {
              return(
                <View key={index} style={{ justifyContent : "center", alignItems: "center" }}>
                  <RenderLikedAyahs surah_number={item.surah_number} ayah_number={item.ayah_number}/>
                  <Divider />
                </View>
              )
            }) : <></>}
          </ScrollView>
      )
  }
  
  const Surah = () => {
    const { session } = useAuth()
    const [ likedSurahs, setLikedSurahs ] = useState<likedSurahsProp[] | null>()
    const getLikedSurahs = async () => {
      const { data , error } = await supabase.from("user_liked_surahs").select("surah_number").eq("user_id", session?.user.id)
      if( error ){
        alert(error.message)
      }
      if( data ){
        setLikedSurahs(data)
      }
    }
    useEffect(() => {
      getLikedSurahs()
      const listenForLikedSurah = supabase.channel(" Liked Surah Channel ").on(
        "postgres_changes",
        {
            event: "*",
            schema : "public",
            table : "user_liked_surahs"
        },
        (payload) => getLikedSurahs()
    ).subscribe()

    return () => { supabase.removeChannel( listenForLikedSurah) }
    }, [])

    if( !likedSurahs ){
      return <></>
    }
    return(
        <ScrollView className='flex-1 bg-white'>
          { 
          likedSurahs ? likedSurahs.map((item, index) => {
            return(
              <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
                    <RenderLikedSurahs surah_number={item.surah_number} />
              </View>
                )
          }) 
          : <></>
          }
        </ScrollView>
    )
  }
  
  const renderScene = SceneMap({
    first: Ayah,
    second: Surah,
  });


const FavoriteQuran = () => {
  const layout = useWindowDimensions();

  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Ayah' },
    { key: 'second', title: 'Surah' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default FavoriteQuran