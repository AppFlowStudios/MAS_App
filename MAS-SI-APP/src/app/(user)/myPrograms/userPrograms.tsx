import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useAddProgram } from '@/src/providers/addingProgramProvider'
import { add } from 'date-fns';
import RenderMyLibraryProgram from '@/src/components/UserProgramComponets/renderMyLibraryProgram';
export default function userPrograms() {
  const { addedPrograms } = useAddProgram();
  return (
    <View className='bg-white flex-1'>
      <FlatList 
        data={addedPrograms}
        renderItem={({item}) => <RenderMyLibraryProgram program={item} />}
      />
    </View>
  )
}