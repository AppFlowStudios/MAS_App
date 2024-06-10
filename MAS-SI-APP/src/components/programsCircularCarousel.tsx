import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Program } from '../types';
import programsData from '@/assets/data/programsData';
import ProgramsCircularCarouselCard from './programsCircularCarouselCard';
import { useSharedValue } from 'react-native-reanimated';

export default function ProgramsCircularCarousel(  ) {
    const contentOffset = useSharedValue(0);
  return (
    <View>
      <FlatList 
       data={programsData}
       horizontal
       scrollEventThrottle={16}
       onScroll={(event) =>{
        contentOffset.value = event.nativeEvent.contentOffset.x;
       }}
       ItemSeparatorComponent={() => {
        return(
            <View className='m-1' />
        )
       }}
       contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center"
       }}
       renderItem={({item, index}) => <ProgramsCircularCarouselCard program={item} index={index} contentOffset={contentOffset}/>}
      />
    </View>
  )
}