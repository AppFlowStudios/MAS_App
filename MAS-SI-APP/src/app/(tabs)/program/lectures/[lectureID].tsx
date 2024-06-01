import { View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import React from 'react';
import programsData from '@/assets/data/programsData';
export default function Lectures() {
  const { lectureID } = useLocalSearchParams();
  return(
    <View>
      <Text>lectureID : {lectureID}</Text>
    </View>
  )

}