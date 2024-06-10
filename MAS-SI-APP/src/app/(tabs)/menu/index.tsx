import { Image, StyleSheet, View, Text, Animated, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { gettingPrayerData, prayerTimesType } from '@/src/types';
import Table from '@/src/components/prayerTimeTable';
import { format } from 'date-fns';
import { ThePrayerData} from '@/src/components/getPrayerData';
import Paginator from '@/src/components/paginator';
import ProgramsButton from '@/src/components/programsButton';
import EventsButton from '@/src/components/eventsButton';
import SalahDisplayWidget from '@/src/components/salahDisplayWidget';
import JummahTable from '@/src/components/jummahTable';
import ProgramsCircularCarousel from '@/src/components/programsCircularCarousel';
import { LinearGradient } from "expo-linear-gradient"
export default function homeScreen() {
  const [prayerTimes, setPrayerTimes] = useState<prayerTimesType>(
    {"status" : "fail",
    "data" : {
      "salah" : [],
      "iqamah": []
    },
    "message" : ""
     } )
    const [loading, setLoading] = useState(true)
    
    const getCurrDate = new Date();
    const getWeekDate = new Date();
    const currDate = format(getCurrDate, "yyyy-MM-dd");
    getWeekDate.setDate(getCurrDate.getDate() + 6)
    const weekDate = format(getWeekDate, "yyyy-MM-dd");
    const masjidalAPIURL = `https://masjidal.com/api/v1/time/range?masjid_id=3OA8V3Kp&from_date=${currDate}&to_date=${weekDate}`
  
    useEffect( () => {
      fetch(masjidalAPIURL)
        .then( (response) => response.json() )
        .then( (json) => setPrayerTimes(json) )
        .catch( (error) =>  console.error(error))
        .finally( () => setLoading(false) )
        console.log("getPrayer Called")
    }, [])

    if (loading){
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    const prayer : gettingPrayerData[] = ThePrayerData({prayerTimes});

    return (
      <ScrollView className="bg-[#f9f9f9] h-full" indicatorStyle='black'>
      <LinearGradient style={styles.background} colors={['transparent', "#0D509D"]} start={{y: 0.3, x: 0.5}}/>

            <View className='w-[100%] m-auto  justify-center items-center mt-[10%] flex-0 '>
              <Image source={require("@/assets/images/massiLogo2.png")} style={styles.massiLogo} />
            </View>
            <View style={{height: 200, overflow: "hidden", justifyContent:"center", alignItems: "center", borderBottomStartRadius : 40, borderBottomEndRadius: 40}} className='border'>
              <SalahDisplayWidget prayer={prayer[0]} nextPrayer={prayer[1]}/>
            </View>
            <View className='border'>
              <JummahTable />
            </View>
            <View className='justify-center border'>
              <ProgramsCircularCarousel />
            </View>
            
      </ScrollView>
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