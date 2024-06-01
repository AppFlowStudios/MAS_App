import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack, useNavigation } from 'expo-router';
import programsData from '@/assets/data/programsData';
import { Lectures } from '@/src/types';
import { Link } from "expo-router";
import LecturesListLecture from '@/src/components/LectureListLecture';


const programLectures = () => {
  const { programId } = useLocalSearchParams();

  const program = programsData.find(p => p.programId.toString() == programId)
  if (!program){
    return (
      <Text> Program Not Found </Text>
    )
  }
  const lectures = program.lectures
  return (
    <View>
      <Stack.Screen options={ { title: "Lectures"} }/>
      <FlatList 
        data={lectures}
        renderItem={ ({item}) => <LecturesListLecture lecture={item}/> }
      />
    </View>
  )
}

export default programLectures