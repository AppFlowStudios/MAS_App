import { Text, View, Pressable, Image, Alert, Button, Animated, StyleSheet} from 'react-native'
import programsData from '@/assets/data/programsData'
import {Program} from "../types"
import React, { useState, useRef } from 'react'
import { Link, router } from 'expo-router';
import { useProgram } from '../providers/programProvider';
import  Swipeable, { SwipeableProps }  from 'react-native-gesture-handler/Swipeable';
import { useAddProgram } from '../providers/addingProgramProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
export const defaultProgramImage = "https://ugc.production.linktr.ee/e3KxJRUJTu2zELiw7FCf_hH45sO9R0guiKEY2?io=true&size=avatar-v3_0"
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider'; 
type ProgramsListProgramProps = {
    program : Program,
}


export default function ProgramsListProgram( {program} : ProgramsListProgramProps){
    const { session } = useAuth()
    const [ isSwiped, setIsSwiped ] = useState(false);
    const swipeableRef = useRef<Swipeable>(null);
    const closeSwipeable = () => {
      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
    };
    const { onSetAddProgram } = useAddProgram();
    const { onSetProgram } = useProgram();
    const setTheProgram = () =>{
        onSetProgram(program)
    }

    async function addToProgramToUserLibrary(){
        console.log(session?.user.id)
        console.log(program.program_id)
        const { error } = await supabase.from("added_programs").insert({ user_id : session?.user.id, program_id : program.program_id})
        if(error) {
            console.log(error)
        }
    }

    const rightSideButton = () => {
        return (
            <View style={{width: "80%", height: "80%", justifyContent: "center", alignItems: "center"}}>
                <Button
                    title='Add To Programs'
                    onPress={() => {onSetAddProgram(program); addToProgramToUserLibrary(); closeSwipeable()}}
                />
            </View>
        )
    }



    return(
        <View style={{ width: "100%", height: 120, marginHorizontal: 10}} className=''>
            <Link  href={`/menu/program/${program.program_id}`} onPress={setTheProgram} asChild>
                <TouchableOpacity className=''>
                    <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center"}}>

                        <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15}} className=''>
                            <Image 
                                source={{ uri: program.program_img || defaultProgramImage }}
                                style={{width: 130, height: 100, objectFit: "cover", borderRadius: 15}}
                                className=''
                            />
                        </View>
                        <View>
                            <Swipeable
                                ref={swipeableRef}
                                renderRightActions={rightSideButton}
                                containerStyle={{flexDirection:"row"}}
                                onSwipeableOpen={() => setIsSwiped(true)}
                                onSwipeableClose={() => setIsSwiped(false)}
                            >
                                <View className='mt-2 items-center justify-center bg-white' style={{height: "80%", borderRadius: 20, marginLeft: "10%", width: 200}}>
                                    <Text style={{textAlign: "center", fontWeight: "bold"}}>{program.program_name}</Text>
                                    <Text style={{textAlign: "center"}}>By: {program.program_speaker}</Text>
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