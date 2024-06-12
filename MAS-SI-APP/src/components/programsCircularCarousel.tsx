import { View, Text, FlatList, Dimensions, Animated } from 'react-native';
import React, {useRef, useState, useEffect}from 'react';
import { Program } from '../types';
import programsData from '@/assets/data/programsData';
import ProgramsCircularCarouselCard from './programsCircularCarouselCard';
import { useSharedValue } from 'react-native-reanimated';
import Paginator from './paginator';
export default function ProgramsCircularCarousel(  ) {
  const scrollx = useRef( new Animated.Value(0) ).current;
  const tablesRef = useRef(null);
  const viewableItemsChanged = useRef( ({viewableItems} : any)  =>{
    setCurrentCarousalIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold : 50}).current;
  const [currentCarousalIndex, setCurrentCarousalIndex] = useState(0)

  return (
    <View>
              <FlatList 
                data={programsData}
                renderItem={({item}) => <ProgramsCircularCarouselCard program={item} />}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={Animated.event( [{ nativeEvent: {contentOffset : {x : scrollx } } }],{
                  useNativeDriver: false
                } )}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={tablesRef}
              />
    </View>
  )
}