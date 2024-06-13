import { Image, StyleSheet, View, Text, Animated, FlatList, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { gettingPrayerData, prayerTimesType } from '@/src/types';
import svg, { Path, Svg } from "react-native-svg";
import { format } from 'date-fns';
import { ThePrayerData} from '@/src/components/getPrayerData';
import { usePrayer } from '@/src/providers/prayerTimesProvider';
import Paginator from '@/src/components/paginator';
import SalahDisplayWidget from '@/src/components/salahDisplayWidget';
import {JummahTable} from '@/src/components/jummahTable';
import ProgramsCircularCarousel from '@/src/components/programsCircularCarousel';
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { JummahBottomSheetProp } from '@/src/types';
export default function homeScreen() {
  const { onSetPrayerTimesWeek } = usePrayer();
  const [prayerTimes, setPrayerTimes] = useState<prayerTimesType>(
    {"status" : "fail",
    "data" : {
      "salah" : [],
      "iqamah": []
    },
    "message" : ""
     } )
    const [loading, setLoading] = useState(true)
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
      .then( () => onSetPrayerTimesWeek(ThePrayerData({prayerTimes})))
      .catch( (error) =>  console.error(error))
      .finally( () => setLoading(false) )
      console.log("getPrayer Called")
    }
    useEffect( () => {
      getMasjidalApi();
    }, [])

    if (loading){
      return(
        <View className='justify-center items-center'>
          <Text>Loading...</Text>
        </View>
      )
    }
    const prayer : gettingPrayerData[] = ThePrayerData({prayerTimes});
    const jummahData : JummahBottomSheetProp ={
      jummahSpeaker : "AB",
      jummahSpeakerImg : " sdas",
      jummahTopic : "YARR"
  }
    return (
      <ScrollView className="bg-[#f9f9f9] h-full" indicatorStyle='black'>
            <View className='w-[100%] m-auto  justify-center items-center mt-[10%] flex-0'>
              <Image source={require("@/assets/images/massiLogo2.png")} style={styles.massiLogo} />
            </View>
            <View style={{height: 250, overflow: "hidden", justifyContent:"center", borderBottomStartRadius : 40, borderBottomEndRadius: 40}} className=''>
              <SalahDisplayWidget prayer={prayer[0]} nextPrayer={prayer[1]}/>
            </View>
            <View className='pt-3'>
              <ProgramsCircularCarousel />
            </View>
            <View className=''>
              <JummahTable jummahSpeaker={jummahData.jummahSpeaker} jummahSpeakerImg={jummahData.jummahSpeakerImg} jummahTopic={jummahData.jummahTopic} ref={bottomSheetRef}/>
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


