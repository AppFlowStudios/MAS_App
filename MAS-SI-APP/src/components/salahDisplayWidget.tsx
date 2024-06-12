import { View, Text, ImageBackground } from 'react-native'
import  React, { useState, useEffect } from 'react'
import { gettingPrayerData } from '../types';
import { format } from 'date-fns';
import moment from 'moment';
type salahDisplayWidgetProp = {
    prayer : gettingPrayerData,
    nextPrayer: gettingPrayerData
}
type timeProp = {
    time: string
}
type currentSalahProp = {
    salah: string,
    athan: string,
    iqamah: string
}
export default function SalahDisplayWidget ( {prayer, nextPrayer} : salahDisplayWidgetProp ) {
    
    const salahArray = ["fajr", "zuhr", "asr", "maghrib", "isha"];
    const [liveTime, setLiveTime] = useState(new Date());
    const [salahIndex, setCurrentSalahIndex] = useState(0);
    const [currentSalah, setCurrentSalah] = useState<currentSalahProp>({
        salah : "fajr",
        athan : prayer.athan_fajr,
        iqamah : prayer.iqa_fajr
    });
    const refreshLiveTime = () => {
        setLiveTime(new Date())
      }
    

      const onSetCurrentSalah = () => {
        const salah = salahArray[salahIndex];
        const salahCapitalized = salah.charAt(0).toUpperCase() + salah.slice(1);
        const salahObj = {
            salah: salahCapitalized,
            athan: prayer[`athan_${salah}`],
            iqamah: prayer[`iqa_${salah}`]
        }
        setCurrentSalah(salahObj);
    }


    const getTimeToNextPrayer = () => {
        const time1 = moment(currentTime, "HH:mm:ss A");
        const time2 = moment(currentSalah.iqamah, "HH:mm:ss A");
        
        console.log(time1.format("HH:mm:ss A"))
        console.log(time2.format("HH:mm:ss A"))

        // Check if currentSalah.iqamah is a valid time string
        if (!time2.isValid()) {
            return "N/A";
        }
    
        const duration = moment.duration(time2.diff(time1));
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        if (hours == 0 && minutes == 0){
            return `${seconds} secs`;
        }
        else if (hours == 0){
            return `${minutes} mins ${seconds} secs`;
        }
        return `${hours} hr ${minutes} mins ${seconds} secs`;
    }

    const currentTime = liveTime.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "numeric", second: "numeric" });
    const timeToNextPrayer = getTimeToNextPrayer();
    const midNight = moment("12:01AM", "HH:mm A");
    const nextDayMidnight = midNight.add(1, "days");
    
    const getTimeToMidNight = () => {
        const time1 = moment(currentTime, "HH:mm:ss A");
        const time2 = nextDayMidnight;
    
        const duration = moment.duration(time2.diff(time1));
        return duration.asMilliseconds();
    }


    useEffect(() => {
        const timerId = setInterval(refreshLiveTime, 1000)
    
        const compareTime = () => {
            const time1 = moment(currentTime, "HH:mm:ss A");
            const time2 = moment(currentSalah.iqamah, "HH:mm:ss A")
    
            if (time1.isBefore(midNight) && salahIndex == 4) {
                setTimeout(onSetCurrentSalah, getTimeToMidNight())
            }
            else if (time1.isAfter(time2) && salahIndex > 4) {
                setCurrentSalahIndex(0)
            }
            else if (time1.isAfter(time2)) {
                setCurrentSalahIndex(salahIndex => salahIndex + 1)
                onSetCurrentSalah()
            }
        }
    
        compareTime();
    
        return function cleanup() {
            clearInterval(timerId)
        }
    }, [refreshLiveTime, currentTime, currentSalah, midNight, salahIndex, onSetCurrentSalah, getTimeToMidNight, setCurrentSalahIndex])
  return (
    <View>
    <ImageBackground 
        source={require("@/assets/images/salahPictures/DJI_0049.jpg")}
        style={{height: "100%", width: "100%",}}
        className='border'
    >
      <View className='flex-row mt-4'>
        <Text className='text-white px-5 font-bold text-lg mt-2' style={{textShadowColor: "#000", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1 }}>{prayer.hijri_month} {prayer.hijri_date}</Text>
        <Text className='text-gray-100 ml-[23%] font-bold text-2xl' style={{textShadowColor: "#000", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1 }}>Iqamah</Text>
      </View>
      <View className='flex-row '>
        <Text className='text-white px-5 font-bold text-4xl' style={{textShadowColor: "#000", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1}} >{currentSalah.salah}</Text>
        <Text className='text-gray-100 ml-[25%] font-bold text-3xl' style={{textShadowColor: "#000", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1 }}>{currentSalah.iqamah}</Text>
      </View>
      <View className='flex-row'>
      <Text className='text-gray-100  px-5 font-bold text-3xl' style={{textShadowColor: "#000", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1 }}>{currentSalah.athan}</Text>
      </View>
      <View className='flex-row mt-5 '>
        <Text className='text-white px-5 font-bold text-2xl' style={{textShadowColor: "#000", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1 }}>Iqamah in {timeToNextPrayer}</Text>
      </View>
      {/*<Text className='text-white'>Current Salah : {currentSalah.salah}</Text>
      <Text className='text-white'>Current Salah iqamah : {currentSalah.iqamah}</Text>
  <Text className='text-white'>Current Time : {currentTime} {"\n"}Time to next Prayer : {timeToNextPrayer}</Text>*/}
    </ImageBackground>
    </View>
  )
}