import { View, Text, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useState, useCallback, useEffect } from 'react';
import { useProgram } from '@/src/providers/programProvider';
import YoutubePlayer from "react-native-youtube-iframe"
import { EventLectureType, Lectures } from '@/src/types';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAuth } from "@/src/providers/AuthProvider"
import { supabase } from '@/src/lib/supabase';
import { setDate } from 'date-fns';

export default function LecturesData() {
  const { session } = useAuth()
  const [ playing, setPlaying ] = useState(false)
  const { lectureID } = useLocalSearchParams();
  const [ currentLecture, setLecture ] = useState<EventLectureType>()
  const { currentProgram } = useProgram();
  const layout  = useWindowDimensions()
  const [index, setIndex] = useState(0)

  async function getLecture(){
    const { data, error } = await supabase.from("events_lectures").select("*").eq("event_lecture_id", lectureID).single()
    if( error ){
      alert(error)
    }
    if(data){
      setLecture(data)
    }
  }
  
  useEffect(() => {
    getLecture()
  },[session])

  const onStateChange = useCallback((state : any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


  const LectureAIKeyNotes = () => {
    return(
      <>
        <Text>{currentLecture?.event_lecture_desc}</Text>
      </>
    )
  }
  const LectureAISummay = () => {
    return(
      <>
        <Text>{currentLecture?.event_lecture_desc}</Text>
      </>
    )
  }
  
  const renderScene = SceneMap({
    first: LectureAISummay,
    second: LectureAIKeyNotes,
  });
  
  const routes = [
    { key: 'first', title: 'Summary' },
    { key: 'second', title: 'Key Notes' },
  ];
  
  const renderTabBar = (props : any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#0D509D', }}
      
    />
  );


  return(
    <>
      <YoutubePlayer 
        height={215}
        play={playing}
        videoId={currentLecture?.event_lecture_link}
        onChangeState={onStateChange}
      />
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
    </>
  )
}


