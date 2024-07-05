import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import programsData from '@/assets/data/programsData';
import { Lectures, Program } from '@/src/types';
import { Link } from "expo-router";
import { defaultProgramImage } from '../ProgramsListProgram';
type LecturesListProp = {
  lecture : Lectures
}

type ProgramDataType = {
    programData : Program
}

const RenderMyLibraryProgramLectures = ( {lecture} : LecturesListProp ) => {
    return (
        <View className='bg-white'>
          <Stack.Screen options={{ title: "Lectures"}}/>
          <Pressable>
            <Link href={`/myPrograms/lectures/${lecture.lectureID}`}>
            <Text className='text-1xl font-bold'>
              {lecture.lectureName}
            </Text>
            </Link>
          </Pressable>
    
        </View>
    )
}

export default RenderMyLibraryProgramLectures