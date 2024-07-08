import { View, Text, Pressable, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import programsData from '@/assets/data/programsData';
import { Lectures, Program } from '@/src/types';
import { Link } from "expo-router";
import { defaultProgramImage } from './ProgramsListProgram';
import { Icon, IconButton } from 'react-native-paper';
import LectureDotsMenu from './LectureComponets/LectureDotsMenu';
type LecturesListProp = {
  lecture : Lectures
  index : number
  speaker : string | null
}
const { width } = Dimensions.get("window")
type ProgramDataType = {
    programData : Program
}
const LecturesListLecture = ( {lecture, index, speaker} : LecturesListProp ) => {
  return (
    <View className='bg-white mt-2'>
      <Pressable>
      <View className='ml-2 flex-row items-center' >
        <Link href={`/menu/program/lectures/${lecture.lectureID}`}>
          <Text className='text-xl font-bold text-gray-400 ml-2' >{index + 1}</Text>
          <View className='flex-col justify-center'>
            <Text className='text-md font-bold ml-2 text-black' style={{flexShrink: 1}}>{lecture.lectureName}</Text>
            <View className='flex-row' style={{flexShrink: 1, width: width / 1.5}}>
              {speaker == "MAS" ? <Text className='ml-2 text-gray-500' style={{flexShrink:1}} numberOfLines={1}>{lecture.lectureSpeaker} </Text> : <Text className='ml-2 text-gray-500'> {lecture.lectureData}</Text>}
            </View>
          </View>
          </Link>
          <View className='flex-row items-center justify-center ml-3' style={{justifyContent: "flex-end"}}>
            <IconButton icon="cards-heart-outline"  iconColor='black'style={{flexShrink:1 }} onPress={() => <LectureDotsMenu />}/>
            <LectureDotsMenu />
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default LecturesListLecture;

