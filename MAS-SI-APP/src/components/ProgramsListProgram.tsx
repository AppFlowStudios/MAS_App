import { Text, View, Pressable, Image, Alert, Button, StyleSheet, Share} from 'react-native'
import programsData from '@/assets/data/programsData'
import {Program} from "../types"
import React, { useState, useRef, useEffect } from 'react'
import { Link, router } from 'expo-router';
import { useProgram } from '../providers/programProvider';
import  Swipeable, { SwipeableProps }  from 'react-native-gesture-handler/Swipeable';
import { useAddProgram } from '../providers/addingProgramProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
export const defaultProgramImage = "https://ugc.production.linktr.ee/e3KxJRUJTu2zELiw7FCf_hH45sO9R0guiKEY2?io=true&size=avatar-v3_0"
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider'; 
import * as Haptics from "expo-haptics"
import { SharedElement } from "react-navigation-shared-element"
import Animated, { Easing, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { SharedTransition } from 'react-native-reanimated';
import { useNavigation, } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
type ProgramsListProgramProps = {
    program : Program,
}


export default function ProgramsListProgram( {program} : ProgramsListProgramProps){
    const { session } = useAuth()
    const [ programImg, setProgramImg ] = useState('')
    const [ isSwiped, setIsSwiped ] = useState(false);
    const swipeableRef = useRef<Swipeable>(null);
   
    const closeSwipeable = () => {
      if ( swipeableRef.current ) {
        swipeableRef.current.close();
      }
    };

    async function addToProgramToUserLibrary(){
        const { error } = await supabase.from("added_programs").insert({ user_id : session?.user.id, program_id : program.program_id})
        if(error) {
            console.log(error)
        }
    }
   
    async function addProgramToNotifications(){
        const { error } = await supabase.from("added_notifications_programs").insert({ user_id : session?.user.id, program_id : program.program_id})
        if(error) {
            console.log(error)
        }

    }
    const rightSideButton = () => {
        if( !program.has_lectures && !program.program_is_paid){
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
        else if(program.has_lectures && !program.program_is_paid){
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
        else if( program.program_is_paid ){
            return (
                <View>
                    <View style={{width: "80%", height: "80%", justifyContent: "center", alignItems: "flex-start", marginRight: 2}} className='border' >
                        <Button
                            title='Add To Cart'
                            onPress={() => {  
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

    const transition = SharedTransition.custom(values => {
        'worklet';
      
        return {
          height: withTiming(values.targetHeight, {duration: 300}),
          width: withTiming(values.targetWidth, {duration: 300}),
          originX: withTiming(values.targetOriginX, {duration: 300}),
          originY: withSequence(
            withTiming(values.currentOriginY + 50, {
              duration: 300,
              easing: Easing.linear,
            }),
            withTiming(values.targetOriginY, {
              duration: 500,
              easing: Easing.linear,
            }),
          ),
        };
      });
      const getData = async (key : string) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // Data found
            const img = JSON.parse(value)
            return img.program_img
          } else {
            // No data found
            console.log('No data found for key:', key);
            return
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };
    
    return(
        <View style={{ width: "100%", height: 120, marginHorizontal: 5}}>
            <Link  href={`/menu/program/${program.program_id}`} asChild >
                <TouchableOpacity>
                    <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center"}}>

                        <Animated.View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 15}} >
                                <Animated.Image 
                                    source={{ uri: program.program_img || defaultProgramImage }}
                                    style={{width: 130, height: 100, objectFit: "cover", borderRadius: 15}}                                    
                                />
                        </Animated.View>
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