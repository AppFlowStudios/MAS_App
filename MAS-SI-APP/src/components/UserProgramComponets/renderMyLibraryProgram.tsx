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
    <View style={{ width: "100%", height: 120, marginHorizontal: 10}} className=''>
    <Link  href={`../myPrograms/${program.programId}`} onPress={setTheProgram} asChild>
        <TouchableOpacity className=''>
            <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center"}}>

                <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 30}} className=''>
                    <Image 
                        source={{ uri: program.programImg || defaultProgramImage }}
                        style={{width: 150, height: 120, objectFit: "contain", borderRadius: 30}}
                        className=''
                    />
                </View>
                <View>
  
                        <View className='mt-2 items-center justify-center bg-white' style={{height: "80%", borderRadius: 20, marginLeft: "10%", width: 200}}>
                            <Text style={{textAlign: "center"}}>{program.programName}</Text>
                            <Text style={{textAlign: "center"}}>By: {program.programSpeaker}</Text>
                        </View>
                </View>
            </View>
        </TouchableOpacity>
    </Link>
</View>
  )
}

export default RenderMyLibraryProgram