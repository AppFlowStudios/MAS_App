import { View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import React from 'react';
import { useProgram } from '@/src/providers/programProvider';
export default function Lectures() {
  const { lectureID } = useLocalSearchParams();
  const { currentProgram } = useProgram();
  const programId = currentProgram.programId;
  if (!lectureID){
    return(
      <View>
        <Text> Lecture Not Found </Text>
      </View>
    )
  }
  const lecID: number = +lectureID
  const currentLecture = currentProgram.lectures[lecID]
  return(
    <View>
      <Text>CurrentProgram : {programId}</Text>
      <Text>lectureID : {lectureID}</Text>
      <Text>{currentLecture.lectureLink}</Text>
    </View>
  )

}