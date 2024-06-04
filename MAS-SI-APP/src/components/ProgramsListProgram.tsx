import { Text, View, Pressable, Image} from 'react-native'
import programsData from '@/assets/data/programsData'
import {Program} from "../types"
import React from 'react'
import { Link } from 'expo-router';
import { useProgram } from '../providers/programProvider';
export const defaultProgramImage = "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/342522083_1599415967228635_7274132664010740189_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xqv1UTMseJEQ7kNvgG000u7&_nc_ht=scontent-lga3-1.xx&oh=00_AYB213DgyZXD2LApnhHyvbqRWw49Z27R68zj7R0uxCsKDw&oe=665FFFA7"

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
        <Pressable>
            <View>
            <Link href={`/program/${program.programId}`} onPress={setTheProgram}>
            <View className='align-center justify-center'>
            <Image 
                source={{ uri: program.programImg || defaultProgramImage }}
                style={{width: 100, height: 100, objectFit: "contain"}}
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
            </Link>
            </View>
        </Pressable>
        </View>
    )
}

const styles = {
    programBox: "bg-white flex-row h-100 flex-1 align-center justify-center",
  }


  