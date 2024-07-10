import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAddProgram } from '@/src/providers/addingProgramProvider'
import { add } from 'date-fns';
import RenderMyLibraryProgram from '@/src/components/UserProgramComponets/renderMyLibraryProgram';
import { useAuth } from '@/src/providers/AuthProvider';
import { supabase } from '@/src/lib/supabase';
import { Program } from '@/src/types';
import { Divider, Icon } from 'react-native-paper';
import { Link } from 'expo-router';
export default function userPrograms() {
  const { addedPrograms } = useAddProgram();
  const { session } = useAuth()
  type program_id  = {
    program_id : string
  }
  const [ userPrograms, setUserPrograms ] = useState<program_id[]>()
  async function getUserProgramLibrary(){
    const {data, error} = await supabase.from("liked_programs").select("program_id").eq("user_id", session?.user.id)
    if(error){
      console.log(error)
    }
    if(data){
      console.log(data)
      setUserPrograms(data)
    }
  }

  useEffect(() => {
    getUserProgramLibrary()
  }, [session])
  console.log(addedPrograms)
  return (
    <View className='bg-white flex-1 '>
      <View className='flex-row h-[30] items-center'>
        <Link href={"/myPrograms/likedLectures/AllLikedLectures"} asChild>
        <Pressable className='flex-row items-center'>
          <Icon source={"heart-box-outline"} color='red' size={20}/>
          <Text>Favorite Lectures</Text>
        </Pressable>
        </Link>
      </View> 
      <Divider />
      <FlatList 
        numColumns={2}
        data={userPrograms}
        renderItem={({item}) => <RenderMyLibraryProgram program_id={item.program_id} />}
      />
    </View>
  )
}