import { View, Text, FlatList, Dimensions, useWindowDimensions, ScrollView, Image  } from 'react-native';
import Animated, { runOnJS } from 'react-native-reanimated';
import React, {useRef, useState, useEffect, useCallback }from 'react';
import { Program } from '../types';
import programsData from '@/assets/data/programsData';
import ProgramsCircularCarouselCard from './programsCircularCarouselCard';
import { supabase } from '../lib/supabase';
import { ActivityIndicator } from 'react-native-paper';

type ProgramsCircularProp = {
  sideCardLength : number,
  spaceing : number,
  cardLength : number
}

export default function ProgramsCircularCarousel(  ) {
    const [scrollX, setScrollX] = useState(0);
    const [ loading, setLoading ] = useState( true ) 
    const windowWidth = Dimensions.get("window").width;
    const flatListRef = useRef<FlatList>(null);
    const [active, setActive] = useState(0);
    const [ programsData, setProgramsData ] = useState<Program[] | null>()
    const indexRef = useRef(active);
    indexRef.current = active;

    const fetchProgramsData = async () => {
      const { data, error } = await supabase.from("programs").select("*").range(0, 7)
      if( error ){
        console.log(error)
      }
      if( data ){
        setProgramsData(data)
        setLoading( false )
      }
    
    }
    
    useEffect(() => {
      fetchProgramsData()

    }, [])
{ /*<ScrollView horizontal>
      {programsData?.map((item, index) => {
        return(
          <View>
            <View style={{borderRadius: 34, overflow: "hidden"}}>
              <Image source={{uri: item.program_img || ""}} style={{ width : "100%", height: undefined, aspectRatio: 1}}/>
            </View>
          </View>
        )
      })}
    </ScrollView> */}
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
    setActive(index)
  }
  
    const SPACEING = windowWidth * 0.02;
    const listItemWidth = windowWidth * 0.6;
    const endOfList = programsData?.length;
    const SIDE_CARD_LENGTH = (windowWidth * 0.25) / 2;
  
  if( loading ){
    return (<View className=' justify-center items-center '> <ActivityIndicator /> </View>)
  }
  return (
    
    <View>
    <Animated.View className='' style={{height: 300}}>
      
      <Animated.FlatList 
                data={programsData}
                renderItem={({item, index}) =>  <ProgramsCircularCarouselCard scrollX={scrollX} listItemWidth={listItemWidth} program={item} index={index} itemSpacer={SIDE_CARD_LENGTH} spacing={SPACEING} lastIndex={endOfList}/>}
                horizontal
                onScroll={(event) =>{
                  handleScroll(event);
                  setScrollX(event.nativeEvent.contentOffset.x);
                }}
                snapToInterval={listItemWidth + (SPACEING * 1.5)}
                scrollEventThrottle={16}
                decelerationRate={0.6}
                disableIntervalMomentum={true}
                disableScrollViewPanResponder={true}
                snapToAlignment={"start"}
                showsHorizontalScrollIndicator={false}
                getItemLayout={getItemLayout}
                ref={flatListRef}
       />
       
    </Animated.View>
    </View>

  )
}

{
  /*

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
  setActive(index)
}


    const SPACEING = windowWidth * 0.02;
    const listItemWidth = windowWidth * 0.6;
    const SPACER_ITEM_SIZE = (windowWidth - listItemWidth) / 2;
    const endOfList = programsData?.length;
    const SIDE_CARD_LENGTH = (windowWidth * 0.18) / 2;



      <View>
    <Animated.View className='' style={{height: 300}}>
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

    */
}