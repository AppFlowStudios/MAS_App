import { View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import React from 'react';
import programsData from '@/assets/data/programsData';
export default function Lectures() {
  const { lectureID, programId } = useLocalSearchParams();
  console.log(lectureID)
  console.log(programId)
  const program = programsData.find(p => p.programId.toString() == programId)
  if (!program){
    return(
      <Text>Not Found!!!</Text>
    )
  }
  const lecture = program.lectures.find(l=> l.lectureID.toString() == lectureID)
  if (!lecture){
    return(
      <Text>Lecture Not Found</Text>
    )
  }
  return (
    <View>
      <Text>{lecture.lectureLink}</Text>
    </View>
  )
}