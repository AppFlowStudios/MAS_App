import { View, Text, Animated, FlatList } from 'react-native';
import Paginator from '@/src/components/paginator';
import Table from "@/src/components/prayerTimeTable";
import React, {useEffect, useRef, useState } from 'react';
import { usePrayer } from '@/src/providers/prayerTimesProvider';
import { gettingPrayerData } from '@/src/types';



export default function index() {
  const { prayerTimesWeek } = usePrayer();
  const scrollx = useRef( new Animated.Value(0) ).current;
  const tablesRef = useRef(null);
  const viewableItemsChanged = useRef( ({viewableItems} : any)  =>{
    setCurrentCarousalIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold : 50}).current;
  const [currentCarousalIndex, setCurrentCarousalIndex] = useState(0)
  console.log(prayerTimesWeek)

  return (
    <View className='justify-center items-center  mt-[10%]' style={{height: 500}}>
              <FlatList 
                
                data={prayerTimesWeek}
                renderItem={({item}) => <Table prayerData={item} />}
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
              <Paginator data={prayerTimesWeek} scrollx={scrollx} />

    </View>
  )
}

{/*
                  const scrollx = useRef( new Animated.Value(0) ).current;
                  const tablesRef = useRef(null);
                  const viewableItemsChanged = useRef( ({viewableItems} : any)  =>{
                    setCurrentCarousalIndex(viewableItems[0].index);
                  }).current;
                  const viewConfig = useRef({ viewAreaCoveragePercentThreshold : 50}).current;
                  const [currentCarousalIndex, setCurrentCarousalIndex] = useState(0)
                  
              <Paginator data={prayer} scrollx={scrollx} />
              <FlatList 
                data={prayer}
                renderItem={({item}) => <Table prayerData={item} />}
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
              /> */}