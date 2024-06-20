import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useAddProgram } from '@/src/providers/addingProgramProvider'
import { add } from 'date-fns';
export default function userPrograms() {
  const { addedPrograms } = useAddProgram();
  return (
    <View>
      <FlatList 
        data={addedPrograms}
        renderItem={() => {return(
        <View>
          <Text>Program</Text>
        </View>
        )}}
      />
    </View>
  )
}