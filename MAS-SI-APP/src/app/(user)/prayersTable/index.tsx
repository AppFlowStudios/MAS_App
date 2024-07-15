import { View, Text, Animated, FlatList, Image, FlatListProps, Pressable } from 'react-native';
import Paginator from '@/src/components/paginator';
import Table from "@/src/components/prayerTimeTable";
import React, {useEffect, useRef, useState } from 'react';
import { usePrayer } from '@/src/providers/prayerTimesProvider';
import { gettingPrayerData } from '@/src/types';
import { Divider } from 'react-native-paper';
import { Link } from 'expo-router';


export default function Index() {
  const { prayerTimesWeek } = usePrayer();
  const scrollx = useRef( new Animated.Value(0) ).current;
  const tablesRef = useRef(null);
  const viewableItemsChanged = useRef( ({viewableItems} : any)  =>{
    setCurrentCarousalIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold : 50}).current;
  const [currentCarousalIndex, setCurrentCarousalIndex] = useState(0)

{/*  const flatListRef = useRef<FlatList>(null);
        const nextPress = (index : number) => {
            if (index <= 2) {
                flatListRef?.current?.scrollToIndex({
                    animated: true,
                    index: index + 1
                });
            }
        };
        const backPress = (index : number) => {
            if (index >= 1) {
                flatListRef?.current?.scrollToIndex({
                    animated: true,
                    index: index - 1
                });
            }
        };
*/}

  return (
    <View className='h-full  bg-white'>
          <View className='items-center justify-center '>
            <View className='mt-[15%] h-[400] items-center justify-center '>
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
                contentContainerStyle={{justifyContent: "center", alignItems: "center"}}
              />
            </View>
          </View>


            <View className='flex-row flex-wrap items-center justify-between  mt-[15] '>

              <Link href="/prayersTable/Quran/Quran" asChild>
                  <Pressable className='flex-col items-center justify-center ml-[10]'>
                      <View className='w-[95] h-[80] items-center justify-center bg-white' style={{shadowColor: "black", shadowOffset: {width : 0, height: 0}, shadowOpacity: 1, shadowRadius: 3, borderRadius: 8}}>
                        <Image source={{ uri : "https://cdn-icons-png.freepik.com/512/1705/1705004.png" || undefined}} style={{width: 50, height: 50, objectFit: "contain"}} />
                      </View>
                      <Text className='text-xl font-bold'> Quran </Text>
                  </Pressable>
              </Link>

                <View className='flex-col items-center justify-center'>
                    <View className='w-[95] h-[80] items-center justify-center bg-white' style={{shadowColor: "black", shadowOffset: {width : 0, height: 0}, shadowOpacity: 1, shadowRadius: 3, borderRadius: 8}}>
                      <Image source={{ uri : "https://cdn.icon-icons.com/icons2/2922/PNG/512/ramadhan_moslem_fasting_islam_mosque_icon_183482.png" || undefined}} style={{width: 50, height: 50, objectFit: "contain"}} />
                    </View>
                    <Text className='text-xl font-bold'> Athkar </Text>
                </View>

                <View className='flex-col items-center justify-center mr-[10]'>
                    <View className='w-[95] h-[80] items-center justify-center bg-white' style={{shadowColor: "black", shadowOffset: {width : 0, height: 0}, shadowOpacity: 1, shadowRadius: 3, borderRadius: 8}}>
                      <Image source={{ uri : "https://cdn.iconscout.com/icon/premium/png-256-thumb/dua-4355084-3611324.png?f=webp&w=256" || undefined}} style={{width: 50, height: 50, objectFit: "contain"}} />
                    </View>
                    <Text className='text-xl font-bold'> Duaa </Text>
                </View>

            </View>

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