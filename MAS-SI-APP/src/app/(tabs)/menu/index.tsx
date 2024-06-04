import { Image, StyleSheet, View, Text, Animated, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { gettingPrayerData, prayerTimesType } from '@/src/types';
import Table from '@/src/components/prayerTimeTable';
import { format } from 'date-fns';
import { ThePrayerData} from '@/src/components/getPrayerData';
import ProgramWidgetSlider from '@/src/components/programWidgetSlider';
import Paginator from '@/src/components/paginator';

export default function homeScreen() {
  const [prayerTimes, setPrayerTimes] = useState<prayerTimesType>(
    {"status" : "fail",
    "data" : {
      "salah" : [],
      "iqamah": []
    },
    "message" : ""
     } )
    const scrollx = useRef( new Animated.Value(0) ).current;
    const tablesRef = useRef(null);

    const viewableItemsChanged = useRef( ({viewableItems} : any)  =>{
      setCurrentCarousalIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold : 50}).current;
    
    const [loading, setLoading] = useState(true)
    const [currentCarousalIndex, setCurrentCarousalIndex] = useState(0)
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
      <View style={styles.container}>
        
            <View className='w-[40%] m-auto  justify-center items-center mt-[10%] flex-0'>
              <Image source={require("@/assets/images/massiLogo.png")} style={styles.massiLogo} />
            </View>
            <View className=''>
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
              />
              <Paginator data={prayer} scrollx={scrollx} />
            </View>
      </View>
    )
    
  }

    



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    flexDirection: "column",
  },
  masLogoBox: {
    width: 300,
    height: 100
  },
  massiLogo : {
    width: 300,
    height: 100,
    resizeMode: "contain",
    justifyContent: "center",
  },
});
