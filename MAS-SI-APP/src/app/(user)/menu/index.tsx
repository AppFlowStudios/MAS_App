import { Image, StyleSheet, View, Text, FlatList, ScrollView, Dimensions, useWindowDimensions, ImageBackground, StatusBar } from 'react-native';
import React, { useState, useEffect, useRef, useContext, useCallback} from 'react';
import { gettingPrayerData, prayerTimesType } from '@/src/types';
import { format } from 'date-fns';
import { ThePrayerData} from '@/src/components/getPrayerData';
import { usePrayer } from '@/src/providers/prayerTimesProvider';
import SalahDisplayWidget from '@/src/components/salahDisplayWidget';
import {JummahTable} from '@/src/components/jummahTable';
import ProgramsCircularCarousel from '@/src/components/programsCircularCarousel';
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { JummahBottomSheetProp } from '@/src/types';
import LinkToVolunteersModal from '@/src/components/linkToVolunteersModal';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated,{ interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';
export default function homeScreen() {
  
  const { onSetPrayerTimesWeek } = usePrayer()
  const [prayerTimes, setPrayerTimes] = useState<prayerTimesType>(
    {"status" : "fail",
    "data" : {
      "salah" : [],
      "iqamah": []
    },
    "message" : ""
     } )
    const [loading, setLoading] = useState(true)
    const tabBarHeight = useBottomTabBarHeight();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    
    const getCurrDate = new Date();
    const getWeekDate = new Date();
    const currDate = format(getCurrDate, "yyyy-MM-dd");
    getWeekDate.setDate(getCurrDate.getDate() + 6)
    const weekDate = format(getWeekDate, "yyyy-MM-dd");
    const masjidalAPIURL = `https://masjidal.com/api/v1/time/range?masjid_id=3OA8V3Kp&from_date=${currDate}&to_date=${weekDate}`
    const getMasjidalApi = () => {
      fetch(masjidalAPIURL)
      .then( (response) => response.json() )
      .then( (json) => setPrayerTimes(json) )
      .catch( (error) =>  console.error(error))
      .finally( () => setLoading(false) )
      console.log("getPrayer Called")
    }

    const { width } = Dimensions.get("window")
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler(event => {
      scrollOffset.value = event.contentOffset.y;
    });
    const imageAnimatedStyle = useAnimatedStyle(() => {
      return{
        transform: [
          {
            translateY : interpolate(
            scrollOffset.value,
            [-width / 2, 0, width / 2 ],
            [-width/4, 0, width/ 2 * 0.75]
            )
          },
          {
            scale: interpolate(scrollOffset.value, [-width/ 2, 0, width / 2], [2, 1, 1])
          }
        ]
      }
    })

    useEffect( () => {
      getMasjidalApi();
    }, [])

    const prayer : gettingPrayerData[] = ThePrayerData({prayerTimes});

  
    useEffect( () => {
      onSetPrayerTimesWeek(prayer)
      
    }, [prayerTimes])

    if (loading){
      return(
        <View className='justify-center items-center'>
          <Text>Loading...</Text>
        </View>
      )
    }
   
    const jummahData : JummahBottomSheetProp[] = [
      {
        jummahSpeaker : "Sh Abdelrahman Badawy",
        jummahSpeakerImg : "",
        jummahTopic : "United Hope",
        jummahNum: "12:15 PM",
        jummahDesc: "How to increase your iman and stand for Palestine"
      },
      {
        jummahSpeaker : "T",
        jummahSpeakerImg : "T",
        jummahTopic : "T",
        jummahNum: "1:00 PM",
        jummahDesc: "How to increase your iman and stand for Palestine"
      },
      {
        jummahSpeaker : "3",
        jummahSpeakerImg : "3",
        jummahTopic : "3",
        jummahNum: "1:45 PM",
        jummahDesc: "How to increase your iman and stand for Palestine"
      },
      {
        jummahSpeaker : "4",
        jummahSpeakerImg : "4",
        jummahTopic : "4",
        jummahNum: "3:40PM",
        jummahDesc: "How to increase your iman and stand for Palestine"
      }
  ]

    return (
      <Animated.ScrollView ref={scrollRef} className="bg-white h-full flex-1" onScroll={scrollHandler}>
            <StatusBar barStyle={"dark-content"}/>
            <View className='justify-center items-center mt-[10%] '>
              <Animated.Image source={require("@/assets/images/massiLogo2.png")} style={[{width: width / 2, height: 75, justifyContent: "center" }, imageAnimatedStyle]} />
            </View>

            <View style={{height: 250, overflow: "hidden", justifyContent:"center", borderEndStartRadius: 30 ,borderEndEndRadius: 30}} className=''>
              <SalahDisplayWidget prayer={prayer[0]} nextPrayer={prayer[1]}/>
            </View>
            
              <View className='pt-7 justify-center'>
                <Text className='font-bold text-2xl text-[#0D509D] pl-3 ' style={{textShadowColor: "light-gray", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 0.6}} >Weekly Programs</Text>
              </View>

              <View className='pt-3' style={{height: 250}}>
                <ProgramsCircularCarousel />
              </View>
            <View className='flex-row pl-3 pt-10'>
              <Text className='text-[#0D509D] font-bold text-2xl' style={{textShadowColor: "#light-gray", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1 }}>Volunteers</Text>
            </View>
            <View className='pt-2'>
              <LinkToVolunteersModal />
            </View>
            <View className='flex-row pl-3 pt-6'>
              <Text className='text-[#0D509D] font-bold text-2xl' style={{textShadowColor: "#light-gray", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1 }}>Jummah Schedule</Text>
            </View>
            <View className='justify-center items-center w-[95%] m-auto pt-2' style={{shadowColor: "black", shadowOffset: { width: 0, height: 0},shadowOpacity: 0.6}}>
              <ImageBackground style={{width:"100%", height: 450, justifyContent: "center"}} source={require("@/assets/images/jummahSheetBackImg.png")} resizeMode='stretch' imageStyle={{ borderRadius: 20 }}>
                <JummahTable jummahData={jummahData} ref={bottomSheetRef}/>
              </ImageBackground>
            </View>
            <View style={[{paddingBottom : tabBarHeight}]}></View>
      </Animated.ScrollView>
    )
    
  }

const styles = StyleSheet.create({
  masLogoBox: {
    width: 500,
    height: 50
  },
  massiLogo : {
    width: 500,
    height: 75,
    resizeMode: "contain",
    justifyContent: "center",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 850
  },
  
});


