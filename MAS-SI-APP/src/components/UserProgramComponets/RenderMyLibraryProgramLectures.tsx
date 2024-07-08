import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import programsData from '@/assets/data/programsData';
import { Lectures, Program } from '@/src/types';
import { Link } from "expo-router";
import { defaultProgramImage } from '../ProgramsListProgram';
type LecturesListProp = {
  lecture : Lectures
  index : number
  speaker: string | null
}

type ProgramDataType = {
    programData : Program
}

const RenderMyLibraryProgramLectures = ( {lecture, index, speaker} : LecturesListProp ) => {
    return (
      <View className='bg-white mt-2'>
      <Pressable>
        <Link href={`/myPrograms/lectures/${lecture.lectureID} `}>
        <View className='flex-row items-center justify-center' >
          <Text className='text-xl font-bold text-gray-400 ml-2' >{index + 1}</Text>
          <View className='flex-col justify-center'>
            <Text className='text-md font-bold ml-2 text-black' style={{flexShrink: 1}}>{lecture.lectureName}</Text>
            <View className='flex-row' style={{flexShrink: 1}}>
              {speaker == "MAS" ? <Text className='ml-2 text-gray-500' style={{flexShrink: 1}}>{lecture.lectureSpeaker} </Text> : <Text className='ml-2 text-gray-500'> {lecture.lectureData}</Text>}
          </View>
          </View>
        </View>
        </Link>
      </Pressable>


    </View>
    )
}


export default RenderMyLibraryProgramLectures