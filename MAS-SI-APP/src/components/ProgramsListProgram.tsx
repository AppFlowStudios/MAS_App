import { Text, View, Pressable, Image} from 'react-native'
import programsData from '@/assets/data/programsData'
import {Program} from "../types"
import React from 'react'
import { Link } from 'expo-router';
import { useProgram } from '../providers/programProvider';
export const defaultProgramImage = "https://ugc.production.linktr.ee/e3KxJRUJTu2zELiw7FCf_hH45sO9R0guiKEY2?io=true&size=avatar-v3_0"

type ProgramsListProgramProps = {
    program : Program,
}
export default function ProgramsListProgram( {program} : ProgramsListProgramProps){
    const { onSetProgram } = useProgram();
    const setTheProgram = () =>{
        onSetProgram(program)
    }
    return(
        <View className={styles.programBox}>
        <Link href={`/menu/program/${program.programId}`} onPress={setTheProgram} asChild>
        <Pressable className='border'>
            
            <View className='align-center justify-center ' style={{width: 200, height: 200}}>
            <Image 
                source={{ uri: program.programImg || defaultProgramImage }}
                style={{width: "100%", height: "100%", objectFit: "contain"}}
                className='border'
            />
            </View>
            <View className='align-center justify-center'> 
            <Text className='items-start'>
                <Text className='text-2xl font-bold'>
                        {program.programName}{"\n"}
                </Text>
                <Text className='text-1xl text-grey'>
                    * {program.programDesc}
                </Text>
            </Text>
            </View>
        </Pressable>
        </Link>
        </View>
    )
}

const styles = {
    programBox: "bg-white flex-row h-100 w-[100%] border",
  }


  