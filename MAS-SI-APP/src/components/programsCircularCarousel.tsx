import { View, Text, FlatList, Dimensions, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import React, {useRef, useState, useEffect}from 'react';
import { Program } from '../types';
import programsData from '@/assets/data/programsData';
import ProgramsCircularCarouselCard from './programsCircularCarouselCard';

type ProgramsCircularProp = {
  sideCardLength : number,
  spaceing : number,
  cardLength : number
  
}
export default function ProgramsCircularCarousel(   ) {
    const [scrollX, setScrollX] = useState(0);
    const {width : windowWidth} = useWindowDimensions();
    const SPACEING = windowWidth * 0.02;
    const listItemWidth = windowWidth * 0.6;
    const SPACER_ITEM_SIZE = (windowWidth - listItemWidth) / 2;
    const endOfList = programsData.length;
    const SIDE_CARD_LENGTH = (windowWidth * 0.18) / 2;

   
  return (
    <View style={{ borderRadius: 15 }} className=''>
    <Animated.View className='rounded-20' style={{height: 300}}>
      <Animated.FlatList 
                data={programsData}
                renderItem={({item, index}) =>  <ProgramsCircularCarouselCard scrollX={scrollX} listItemWidth={listItemWidth} program={item} index={index} itemSpacer={SIDE_CARD_LENGTH} spacing={SPACEING} lastIndex={endOfList}/>}
                horizontal
                onScroll={(event) =>{
                  setScrollX(event.nativeEvent.contentOffset.x)
                }}
                scrollEventThrottle={16}
                decelerationRate={0.6}
                snapToInterval={listItemWidth + (SPACEING * 3.3)}
                disableIntervalMomentum={true}
                disableScrollViewPanResponder={true}
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={false}
       />
    </Animated.View>
    </View>
  )
}



{/*



*/}