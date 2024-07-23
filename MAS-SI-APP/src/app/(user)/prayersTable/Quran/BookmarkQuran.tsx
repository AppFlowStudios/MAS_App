import { View, Text , useWindowDimensions, ScrollView} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import React, { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase';
import { useAuth } from "@/src/providers/AuthProvider"
import RenderLikedAyahs from '@/src/components/PrayerTimesComponets/RenderLikedAyahs';
import RenderLikedSurahs from '@/src/components/PrayerTimesComponets/RenderLikedSurahs';
import { Divider } from 'react-native-paper';
import RenderBookmarkAyahs from '@/src/components/PrayerTimesComponets/RenderBookmarkAyahs';
import RenderBookmarkSurahs from '@/src/components/PrayerTimesComponets/RenderBookmarkSurahs';
import { user_bookmark_surahs_channel } from '@/src/lib/supabase';
import { useNavigation } from 'expo-router';
type bookMarkedSurahsProp = {
  surah_number : number
}
type bookmarkedAyahsProp = {
  surah_number : number,
  ayah_number : number
}

const BookmarkSurah = () => {
  const { session } = useAuth()
  const router = useNavigation()
  const [ bookmarkedSurahs, setBookmarkedSurahs ] = useState<bookMarkedSurahsProp[] | null>()
  const getBookmarkedSurahs = async () => {
    const { data, error } = await supabase.from("user_bookmarked_surahs").select("surah_number").eq("user_id", session?.user.id) 
    if ( error ){
      console.log(error)
    }
    if( data ){
      setBookmarkedSurahs(data)
    }
  }

  useEffect(() => {
    getBookmarkedSurahs()
    const user_bookmark_surahs_channel = supabase
    .channel('user_bookmarked_surahs_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: "user_bookmarked_surahs",
      },
      (payload) => getBookmarkedSurahs()
    )
    .subscribe()

    return () => {supabase.removeChannel(user_bookmark_surahs_channel)}
  }, [])
  if( !bookmarkedSurahs ){
    return<></>
  }
  return(
    <ScrollView className='bg-white flex-1'>
    {bookmarkedSurahs ? bookmarkedSurahs.map((item, index) => {
      return(
        <View key={index} style={{ justifyContent : "center", alignItems: "center" }}>
          <RenderBookmarkSurahs surah_number={item.surah_number} />
          <Divider />
        </View>
      )
    }) : <></>}
  </ScrollView>
  )
}

const BookmarkAyah = () => {
const { session } = useAuth()
const [ bookmarkedAyahs, setBookmarkedAyahs ] = useState<bookmarkedAyahsProp[] | null>()
const getBookmarkedAyahs = async () => {
  const { data, error } = await supabase.from("user_bookmarked_ayahs").select("surah_number, ayah_number").eq("user_id" , session?.user.id)
  if( error ){
    console.log( error )
  }
  if( data ){
    setBookmarkedAyahs(data)
  }
}

useEffect(() => {
  getBookmarkedAyahs()
  const user_bookmark_ayahs_channel = supabase
  .channel('user_bookmarked_ayahs_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: "user_bookmarked_ayahs",
    },
    (payload) => getBookmarkedAyahs()
  )
  .subscribe()

  return () => {supabase.removeChannel(user_bookmark_ayahs_channel)}
}, [])

if( !bookmarkedAyahs ){
  return<></>
}
return(
  <ScrollView className='bg-white flex-1'>
  {bookmarkedAyahs ? bookmarkedAyahs.map((item, index) => {
    return(
      <View key={index} style={{ justifyContent : "center", alignItems: "center" }}>
        <RenderBookmarkAyahs surah_number={item.surah_number} ayah_number={item.ayah_number}/>
        <Divider />
      </View>
    )
  }) : <></>}
</ScrollView>
)
}

const renderScene = SceneMap({
  first: BookmarkAyah,
  second: BookmarkSurah,
});
const BookmarkQuran = () => {
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

export default BookmarkQuran