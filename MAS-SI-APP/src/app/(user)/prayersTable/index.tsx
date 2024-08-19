import { View, Text, Animated, FlatList, Image, FlatListProps, Pressable, StatusBar, Dimensions } from 'react-native';
import Paginator from '@/src/components/paginator';
import Table from "@/src/components/prayerTimeTable";
import React, {useEffect, useRef, useState } from 'react';
import { usePrayer } from '@/src/providers/prayerTimesProvider';
import { gettingPrayerData } from '@/src/types';
import { Divider } from 'react-native-paper';
import { Link } from 'expo-router';


export default function Index() {
  const { prayerTimesWeek } = usePrayer();
  const tableWidth = Dimensions.get('screen').width * .95
  const [ tableIndex, setTableIndex ] = useState(0)
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold : 50}).current;
  const handleScroll = (event : any) => {
    const scrollPositon = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPositon / tableWidth);
    setTableIndex(index)
  }
  const flatlistRef = useRef<FlatList>(null)
  useEffect(() => {
    flatlistRef.current?.scrollToIndex({
      index : tableIndex,
      animated : true
    })  
  }, [tableIndex])
  return (
    <View className='h-full  bg-white'>
          <StatusBar barStyle={"dark-content"} />
          <View className='items-center justify-center '>
            <View className='mt-[15%] h-[400] items-center justify-center '>
              <FlatList 
                data={prayerTimesWeek}
                renderItem={({item}) => <Table prayerData={item} setTableIndex={setTableIndex} tableIndex={tableIndex} />}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={(event) => {
                  handleScroll(event)
                }}
                scrollEventThrottle={32}
                viewabilityConfig={viewConfig}
                contentContainerStyle={{justifyContent: "center", alignItems: "center"}}
                ref={flatlistRef}
              />
            </View>
          </View>
    </View>
  )
}


{
  /*
  
   <View className='flex-row items-center justify-between  flex-wrap mt-[10]'>
              <View className='flex-col items-center justify-center ml-[10]'>
                  <View className='w-[95] h-[80] items-center justify-center bg-white' style={{shadowColor: "black", shadowOffset: {width : 0, height: 0}, shadowOpacity: 1, shadowRadius: 3, borderRadius: 8}}>
                    <Image source={{ uri : "https://cdn-icons-png.freepik.com/512/10073/10073987.png" || undefined}} style={{width: 50, height: 50, objectFit: "contain"}} />
                  </View>
                    <Text className='text-xl font-bold'> Qibla </Text>
                </View>

                <View className='flex-col items-center justify-center '>
                  <View className='w-[95] h-[80] items-center justify-center bg-white' style={{shadowColor: "black", shadowOffset: {width : 0, height: 0}, shadowOpacity: 1, shadowRadius: 3, borderRadius: 8}}>
                    <Image source={{ uri : "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" || undefined}} style={{width: 50, height: 50, objectFit: "contain"}} />
                  </View>
                    <Text className='text-xl font-bold'> Calender </Text>
                </View>

                <View className='flex-col items-center justify-center mr-[10]'>
                  <View className='w-[95] h-[80] items-center justify-center bg-white' style={{shadowColor: "black", shadowOffset: {width : 0, height: 0}, shadowOpacity: 1, shadowRadius: 3, borderRadius: 8}}>
                    <Image source={{ uri : "https://cdn-icons-png.flaticon.com/512/5195/5195218.png" || undefined}} style={{width: 50, height: 50, objectFit: "contain"}} />
                  </View>
                    <Text className='text-xl font-bold'> 99 Names</Text>
                </View>
            </View>
  */
}