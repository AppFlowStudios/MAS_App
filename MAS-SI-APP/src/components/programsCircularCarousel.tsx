import { View, Text, FlatList, Dimensions, Animated, useWindowDimensions } from 'react-native';
import React, {useRef, useState, useEffect}from 'react';
import { Program } from '../types';
import programsData from '@/assets/data/programsData';
import ProgramsCircularCarouselCard from './programsCircularCarouselCard';


export default function ProgramsCircularCarousel(  ) {
    const {width : windowWidth} = useWindowDimensions();
    const SPACEING = 10;
    const listItemWidth = windowWidth*0.72;
    const SPACER_ITEM_SIZE = (windowWidth - listItemWidth) / 2;
    const scrollx = useRef( new Animated.Value(0) ).current;
    const endOfList = programsData.length
  return (
    <View className='border rounded-20'>
              <Animated.FlatList 
                data={programsData}
                contentContainerStyle={{
                  alignItems : "center"
                }}
                renderItem={({item, index}) => <ProgramsCircularCarouselCard scrollX={scrollx} listItemWidth={listItemWidth} program={item} index={index} itemSpacer={SPACER_ITEM_SIZE} lastIndex={endOfList}/>}
                horizontal
                snapToInterval={listItemWidth}
                decelerationRate={0}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                
                onScroll={Animated.event( [{ nativeEvent: {contentOffset : {x : scrollx } } }],{
                  useNativeDriver: true
                } )}
                scrollEventThrottle={16}
              />
    </View>
  )
}