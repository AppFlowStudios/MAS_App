import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import { ActivityIndicator } from 'react-native-paper'
type bookMarkedSurahsProp = {
  surah_number : number
}
type bookmarkedAyahsProp = {
  surah_number : number,
  ayah_number : number
}
const BookmarkQuran = () => {
  const { session } = useAuth()
  const [ loading, setLoading ] = useState(true)
  const [ bookmarkedSurahs, setBookmarkedSurahs ] = useState<bookMarkedSurahsProp[] | null>()
  const [ bookmarkedAyahs, setBookmarkedAyahs ] = useState<bookmarkedAyahsProp[] | null>()
  const getBookmarkedSurahs = async () => {
    const { data, error } = await supabase.from("user_bookmarked_surahs").select("surah_number").eq("user_id", session?.user.id) 
    if ( error ){
      console.log(error)
    }
    if( data ){
      setBookmarkedSurahs(data)
    }
  }

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
    setLoading(true)
    getBookmarkedSurahs()
    getBookmarkedAyahs()
    setLoading(false)
  }, [])
  if ( loading ){
    return(
      <View>
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <View>
      <Text>BookmarkQuran</Text>
    </View>
  )
}

export default BookmarkQuran