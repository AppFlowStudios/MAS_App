import { View, Text, FlatList, Dimensions, useWindowDimensions,  } from 'react-native';
import Animated from 'react-native-reanimated';
import React, {useRef, useState, useEffect, useCallback }from 'react';
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
    const flatListRef = useRef<FlatList>(null);
    const [active, setActive] = useState(0);
    const [activeIndex, setActiveIndex] =useState(0);
    const indexRef = useRef(active);
    indexRef.current = active;

   

    useEffect(() => {
    let interval =  setInterval(() =>{
      if (active < Number(endOfList) - 1) {
        flatListRef.current?.scrollToIndex({
          index : active + 1,
          animated : true
        })
        setActive(active + 1);
    } else {
      flatListRef.current?.scrollToIndex({
        index : 0,
        animated : true
      })
    }
    }, 5000);

    return () => clearInterval(interval);
  });


  const getItemLayout = (data : any,index : any) => ({
    length : listItemWidth,
    offset : listItemWidth * index,
    index : index
  })

const handleScroll = (event : any) =>{
  const scrollPositon = event.nativeEvent.contentOffset.x;
  const index = scrollPositon / listItemWidth;
  setActiveIndex(index)
}

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
                  handleScroll(event),
                  setScrollX(event.nativeEvent.contentOffset.x)
                }}
                scrollEventThrottle={16}
                decelerationRate={0.6}
                snapToInterval={listItemWidth + (SPACEING * 3.3)}
                disableIntervalMomentum={true}
                disableScrollViewPanResponder={true}
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={false}
                getItemLayout={getItemLayout}
                ref={flatListRef}
       />
       
    </Animated.View>
    </View>
  )
}

const useInterval = (callback : any, delay : any) => {
  const savedCallback = useRef<FlatList>();

  useEffect(() => {
      savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
      const tick = () => {
          savedCallback?.current;
      };                                                                              
      if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
      }
  }, [delay]);
}
{/*



*/}