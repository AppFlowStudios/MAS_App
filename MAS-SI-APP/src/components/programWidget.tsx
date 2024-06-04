import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { useProgram } from '../providers/programProvider';
import React from 'react'
import programsData from '@/assets/data/programsData';
import {Program} from "../types";
import { defaultProgramImage } from './ProgramsListProgram';
type ProgramsListProgramProps = {
    program : Program
}
export default function ProgramWidget( {program} : ProgramsListProgramProps ) {
    const { onSetProgram } = useProgram();
    const setTheProgram = () =>{
        onSetProgram(program)
    }  

    const { width } = useWindowDimensions();
    return (
    <View style={{width}}>
      <Pressable>
        <Link href={`/program/${program.programId}`} onPress={setTheProgram}>
        <Image source={{ uri: program.programImg || defaultProgramImage}}
        style ={{width: 200, height: 200, objectFit: "contain"}}
        />
        </Link>
      </Pressable>
    </View>
  )
}