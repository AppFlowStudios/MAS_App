import { Image, StyleSheet, View, Text, FlatList, ScrollView, Dimensions, useWindowDimensions } from 'react-native';
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
      .catch( (error) =>  console.error(error))
      .finally( () => setLoading(false) )
      console.log("getPrayer Called")
    }
    
    useEffect( () => {
      getMasjidalApi();
    }, [])

    const prayer : gettingPrayerData[] = ThePrayerData({prayerTimes});
    useEffect( () => {
      onSetPrayerTimesWeek(prayer)
    }, [prayerTimes])

    console.log(prayerTimes)
    if (loading){
      return(
        <View className='justify-center items-center'>
          <Text>Loading...</Text>
        </View>
      )
    }
   
    const jummahData : JummahBottomSheetProp[] = [
      {
        jummahSpeaker : "AB",
        jummahSpeakerImg : "sdas",
        jummahTopic : "YARR"
      },
      {
        jummahSpeaker : "T",
        jummahSpeakerImg : "T",
        jummahTopic : "T" 
      },
      {
        jummahSpeaker : "3",
        jummahSpeakerImg : "3",
        jummahTopic : "3"
      },
      {
        jummahSpeaker : "4",
        jummahSpeakerImg : "4",
        jummahTopic : "4"
      }
  ]
     
  




    return (
      <ScrollView className="bg-[#f2f3f4] h-[100vh]" contentContainerStyle={{flexGrow: 1}} >

            <View className='w-[100%] m-auto  justify-center items-center mt-[10%] flex-0'>
              <Image source={require("@/assets/images/massiLogo2.png")} style={styles.massiLogo} />
            </View>
            <View style={{height: 250, overflow: "hidden", justifyContent:"center", borderEndStartRadius: 30 ,borderEndEndRadius: 30}} className=''>
              <SalahDisplayWidget prayer={prayer[0]} nextPrayer={prayer[1]}/>
            </View>
            
              <View className='pt-7'>
                <Text className='font-bold text-2xl text-[#0D509D] pl-3' style={{textShadowColor: "light-gray", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1}} >Weekly Programs</Text>
              </View>

              <View className='pt-3'>
                <ProgramsCircularCarousel />
              </View>
            
            <View className='bg-[#0D509D] pt-5' style={{borderTopStartRadius: 30, borderTopEndRadius: 30}}>
              <JummahTable jummahData={jummahData} ref={bottomSheetRef}/>
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


