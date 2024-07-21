import { Text, View, Pressable, Image, Alert, Button, Animated, StyleSheet} from 'react-native'
import programsData from '@/assets/data/programsData'
import {Program} from "@/src/types"
import React, { useState, useRef, useEffect } from 'react'
import { Link, router } from 'expo-router';
import  Swipeable, { SwipeableProps }  from 'react-native-gesture-handler/Swipeable';
import { TouchableOpacity } from 'react-native-gesture-handler';
export const defaultProgramImage = "https://ugc.production.linktr.ee/e3KxJRUJTu2zELiw7FCf_hH45sO9R0guiKEY2?io=true&size=avatar-v3_0"
import { supabase } from "@/src/lib/supabase";
import { useAuth } from '@/src/providers/AuthProvider'; 
import * as Haptics from "expo-haptics"
type ProgramsListProgramProps = {
    program_id: number,
}


export default function RenderAddedPrograms( {program_id} : ProgramsListProgramProps){
    const { session } = useAuth()
    const [ isSwiped, setIsSwiped ] = useState(false);
    const swipeableRef = useRef<Swipeable>(null);
    const [ hasLecture , setHasLecture ] = useState(false)
    const [ program, setProgram ] = useState<Program>()
    const getProgram = async () => {
        const { data, error } = await supabase.from("programs").select("*").eq("program_id", program_id).single()
        if( error ){
            console.log( error )
        }
        if( data ){
            console.log(data)
            setProgram(data)
        }
    }

    const checkIfHasLecture = () => {
  
    if ( program?.has_lectures  == true ){
        setHasLecture(true)
    }
    else{
        setHasLecture(false)
    }
    }

    const closeSwipeable = () => {
      if ( swipeableRef.current ) {
        swipeableRef.current.close();
      }
    };

    useEffect(() => {
        getProgram()
        checkIfHasLecture()
    }, [])


    async function addToProgramToUserLibrary(){
        const { error } = await supabase.from("added_programs").insert({ user_id : session?.user.id, program_id : program_id})
        if(error) {
            console.log(error)
        }
    }
   
    async function addProgramToNotifications(){
        const { error } = await supabase.from("added_notifications_programs").insert({ user_id : session?.user.id, program_id : program_id})
        if(error) {
            console.log(error)
        }

    }
    const rightSideButton = () => {
        if( !hasLecture ){
            return (
                <View className=''>
                    <View style={{width: "80%", height: "80%", justifyContent: "center", alignItems: "flex-start"}}>
                    <Button
                        title='Add To Notifications'
                        onPress={() => {
                            addProgramToNotifications();   
                            Haptics.notificationAsync(
                            Haptics.NotificationFeedbackType.Success
                            );
                            closeSwipeable()}}
                    />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View>
                    <View style={{width: "80%", height: "80%", justifyContent: "center", alignItems: "flex-start", marginRight: 2}} className='' >
                        <Button
                            title='Add To Programs'
                            onPress={() => {
                                addToProgramToUserLibrary();   
                                Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Success
                                );
                                closeSwipeable()}}
                        />
                    </View>
                </View>
            )
        }
        
    }


    
    return(
        <View style={{ width: "100%", height: 120, marginHorizontal: 5}} className=''>
            <Link  href={`/menu/program/${program_id}`} asChild>
                <TouchableOpacity className=''>
                    <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center"}}>

                        <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15}} className=''>
                            <Image 
                                source={{ uri: program?.program_img || defaultProgramImage }}
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
                                    <Text style={{textAlign: "center", fontWeight: "bold"}}>{program?.program_name}</Text>
                                    <Text style={{textAlign: "center"}}>By: {program?.program_speaker}</Text>
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