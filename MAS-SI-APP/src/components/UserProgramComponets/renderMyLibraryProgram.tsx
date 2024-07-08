import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Program } from '../../types'
import { Link } from "expo-router"
import { useProgram } from '../../providers/programProvider'
import { defaultProgramImage } from '../ProgramsListProgram'
import RenderMyLibraryProgramLectures from './RenderMyLibraryProgramLectures'
type RenderProgramProp = {
    program : Program
}
const RenderMyLibraryProgram = ({program} : RenderProgramProp) => {
  const { onSetProgram } = useProgram();
  const setTheProgram = () =>{
    onSetProgram(program)
}
  return (
    <View style={{ width: 170, height: 200, justifyContent: "center", alignItems: "center", marginHorizontal: 8}} className=''>
        <Link  href={`../myPrograms/${program.programId}`} onPress={setTheProgram} asChild>
            <TouchableOpacity className=''>
            <View style={{width: 170, height: 170}}>
                    <Image source={{uri: program.programImg || defaultProgramImage }} style={{width : "100%", height: "100%",borderRadius: 8}}/>
            </View>
            <View className='flex-col'>
                <Text className='text-black font-bold'>{program.programName}</Text>
                <Text className='text-gray-500'>{program.programSpeaker}</Text>
            </View>
            </TouchableOpacity>
        </Link>
    </View>
  )
}

export default RenderMyLibraryProgram