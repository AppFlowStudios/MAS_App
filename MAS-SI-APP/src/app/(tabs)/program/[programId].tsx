import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
const programLectures = () => {
  const { programId } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={ {title: "Lectures"} }/>
      <Text>programLectures for {programId}</Text>
    </View>
  )
}

export default programLectures