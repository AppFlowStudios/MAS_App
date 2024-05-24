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
            <Link href={"/programLectures"}>
                <Text className="text-1xl font-bold">
                {program.programName}
                </Text>
                
                </Link>
        </Pressable>
        </View>
    )
}

const styles = {
    programBox: "bg-white",
  }


  