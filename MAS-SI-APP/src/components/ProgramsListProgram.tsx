import { Text, View, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import programsData from '@/assets/data/programsData'
import {Program} from "../types"
import React from 'react'
import { Link } from 'expo-router';

type ProgramsListProgramProps = {
    program : Program
}
export default function ProgramsListProgram( {program} : ProgramsListProgramProps){
    return(
        <View className={styles.programBox}>
        <Pressable>
            <View className='flex-1 flex-col'>
            <Link href={`/program/${program.programId}`}>
                <Text className="text-2xl font-bold text-blue">
                {program.programName}
                </Text>
                <Text className='text-1xl text-grey' >
                    * {program.programDesc}
                </Text>
                </Link>
            </View>
        </Pressable>
        </View>
    )
}

const styles = {
    programBox: "bg-white flex-col",
  }


  