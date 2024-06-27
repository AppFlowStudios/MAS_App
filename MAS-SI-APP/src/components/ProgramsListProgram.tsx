import { Text, View, Pressable, Image, Alert, Button, Animated, StyleSheet} from 'react-native'
import programsData from '@/assets/data/programsData'
import {Program} from "../types"
import React, { useState } from 'react'
import { Link } from 'expo-router';
import { useProgram } from '../providers/programProvider';
import  Swipeable  from 'react-native-gesture-handler/Swipeable';
import { useAddProgram } from '../providers/addingProgramProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
export const defaultProgramImage = "https://ugc.production.linktr.ee/e3KxJRUJTu2zELiw7FCf_hH45sO9R0guiKEY2?io=true&size=avatar-v3_0"

type ProgramsListProgramProps = {
    program : Program,
}


export default function ProgramsListProgram( {program} : ProgramsListProgramProps){
    const [ isSwiped, setIsSwiped ] = useState(false);
    const { onSetAddProgram } = useAddProgram();
    const { onSetProgram } = useProgram();
    const setTheProgram = () =>{
        onSetProgram(program)
    }
    const rightSideButton = (  ) => {
        return (
            <View style={{width: "80%", height: "80%", justifyContent: "center", alignItems: "center"}}>
                <Button
                    title='Add To Programs'
                    onPress={() => {onSetAddProgram(program)}}
                />
            </View>
        )
    }



    return(
        <View style={{ width: "100%", height: 120, marginHorizontal: 10}} className=''>
            <Link  href={`/menu/program/${program.programId}`} onPress={setTheProgram} asChild>
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
                            <Swipeable
                                renderRightActions={rightSideButton}
                                containerStyle={{flexDirection:"row"}}
                                onSwipeableOpen={() => setIsSwiped(true)}
                                onSwipeableClose={() => setIsSwiped(false)}
                            >
                                <View className='mt-2 items-center justify-center bg-white' style={{height: "80%", borderRadius: 20, marginLeft: "10%", width: 200}}>
                                    <Text style={{textAlign: "center"}}>{program.programName}</Text>
                                    <Text style={{textAlign: "center"}}>By: {program.programSpeaker}</Text>
                                </View>
                            </Swipeable>
                            <View className='flex-row justify-center top-0'>
                                <View style={[styles.dot, !isSwiped ? styles.activeDot : null]} />
                                <View style={[styles.dot, isSwiped ? styles.activeDot : null]} />
                        </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
      width: 4,
      height: 4,
      borderRadius: 5,
      backgroundColor: '#bbb',
      margin: 5,
    },
    activeDot: {
      backgroundColor: '#000',
    },
  });
  {/*
   <Swipeable
                renderRightActions={rightSideButton}
                >
                <View className='' style={{width : "100%", backgroundColor: "white", borderRadius: 40}}> 
                    <Text className='items-start'>
                        <Text className='text-2xl font-bold'>
                                {program.programName}{"\n"}
                        </Text>
                        <Text className='text-1xl text-grey'>
                            * {program.programDesc}
                        </Text>
                    </Text>
                </View>
            </Swipeable> 
  */}