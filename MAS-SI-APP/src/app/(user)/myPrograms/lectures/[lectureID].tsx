import { View, Text, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { useProgram } from '@/src/providers/programProvider';
import YoutubePlayer from "react-native-youtube-iframe"
import { Lectures } from '@/src/types';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const LectureAISummay = () => {
  const { lectureID } = useLocalSearchParams();
  const { currentProgram } = useProgram();
  const programId = currentProgram.programId;
  if (!lectureID){
    return(
      <View>
        <Text> Lecture Not Found </Text>
      </View>
    )
  }
  const lecID: number = +lectureID
  const currentLecture = currentProgram.lectures[lecID]
  return(
    <>
      <Text>{currentLecture.lectureAI}</Text>
    </>
  )
}

const LectureAIKeyNotes = () => {
  const { lectureID } = useLocalSearchParams();
  const { currentProgram } = useProgram();
  const programId = currentProgram.programId;
  if (!lectureID){
    return(
      <View>
        <Text> Lecture Not Found </Text>
      </View>
    )
  }
  const lecID: number = +lectureID
  const currentLecture = currentProgram.lectures[lecID]

  return(
    <>
      <Text>{currentLecture.lectureData}</Text>
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

export default function LecturesData() {
  const [ playing, setPlaying ] = useState(false)
  const { lectureID } = useLocalSearchParams();
  const { currentProgram } = useProgram();
  const layout  = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const programId = currentProgram.programId;

  const onStateChange = useCallback((state : any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  

  if (!lectureID){
    return(
      <View>
        <Text> Lecture Not Found </Text>
      </View>
    )
  }
  const lecID: number = +lectureID
  const currentLecture = currentProgram.lectures[lecID]
  return(
    <>
      <YoutubePlayer 
        height={215}
        play={playing}
        videoId={currentLecture.lectureLink}
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


