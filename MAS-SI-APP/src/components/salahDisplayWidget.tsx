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
    
    const salahArray = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
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
    const onSetCurrentSalah = () =>{
        if (salahArray[salahIndex] == "fajr"){
            const fajrSalah = {
                salah: "Fajr",
                athan: prayer.athan_fajr,
                iqamah: prayer.iqa_fajr
            }
            setCurrentSalah(fajrSalah)
        }
        else if(salahArray[salahIndex] == "dhuhr"){
            const dhuhrSalah = {
                salah: "Dhuhr",
                athan: prayer.athan_zuhr,
                iqamah: prayer.iqa_zuhr
            }
            setCurrentSalah(dhuhrSalah)
        }
        else if(salahArray[salahIndex] == "asr"){
            const asrSalah = {
                salah: "Asr",
                athan: prayer.athan_asr,
                iqamah: prayer.iqa_asr
            }
            setCurrentSalah(asrSalah)
        }
        else if(salahArray[salahIndex] == "maghrib"){
            const maghribSalah = {
                salah: "Maghrib",
                athan: prayer.athan_maghrib,
                iqamah: prayer.iqa_maghrib
            }
            setCurrentSalah(maghribSalah)
        }
        else if(salahArray[salahIndex] == "isha"){
            const ishaSalah = {
                salah: "Isha",
                athan: prayer.athan_isha,
                iqamah: prayer.iqa_isha
            }
            setCurrentSalah(ishaSalah)
        }
    }

    const getTimeToNextPrayer = () => {
        const time1 = moment(currentTime, "HH:mm A");
        const time2 = moment(currentSalah.iqamah, "HH:mm A")

        const duration = moment.duration(time2.diff(time1))
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        if (hours == 0){
            return `${minutes} mins`
        }
        return `${hours} hr ${minutes} mins`
    }

    const currentTime = liveTime.toLocaleTimeString("en-US", {hour12: true, hour: "numeric", minute:"numeric"});
    const timeToNextPrayer = getTimeToNextPrayer();
    const nextFajr = nextPrayer.iqa_fajr
    const nextFajrTime = moment(nextFajr, "HH::mm A");
    const nextFajrDay = nextFajrTime.add(1, "day");  
    const midNight = moment("12:01AM" , "HH:mm A");
    const nextDayMidnight = midNight.add(1, "days");
    const getTimeToMidNight = () =>{
        const time1 = moment(currentTime, "HH:mm A");
        const time2 = nextDayMidnight;

        const duration = moment.duration(time2.diff(time1));
        return duration.asMilliseconds();
    }
    const compareTime = ( ) =>{
        const time1 = moment(currentTime, "HH:mm A");
        const time2 = moment(currentSalah.iqamah, "HH:mm A")
  
        const time2Clone = time2.clone().add(1, "hours")
        if( time1.isBefore(midNight) && salahIndex == 4 ){
            setTimeout(onSetCurrentSalah, getTimeToMidNight())
        }
       else if ( time1.isAfter(time2) && salahIndex > 4){
            setCurrentSalahIndex(0)
        }
        else if ( time1.isAfter(time2) ){
            setCurrentSalahIndex(salahIndex => salahIndex + 1)
            onSetCurrentSalah()
            console.log(salahIndex)
        }
    }
    compareTime()
    useEffect(() => {
        const timerId = setInterval(refreshLiveTime, 1000)        
        return function cleanup() {
          clearInterval(timerId)
        }
    }, [])
  return (
    <View>
    <ImageBackground 
        source={require("@/assets/images/hagiaSophia.png")}
        style={{height: 200, width: 420}}
    >
      <Text className='text-white text-center font-bold text-lg mt-2'>{prayer.date} / {prayer.hijri_month} {prayer.hijri_date}</Text>
      <View className='flex-row '>
        <Text className='text-white px-10 font-bold text-lg '>Salah</Text>
        <Text className='text-white px-10 font-bold text-lg'>Athan</Text>
        <Text className='text-white px-10 font-bold text-lg'>Iqamah</Text>
      </View>
      <View className='flex-row items-center justify-center' style={{height: 80}}>
        <Text className='text-white px-7 font-bold text-3xl'>{currentSalah.salah}</Text>
        <Text className='text-white px-7 font-bold text-lg'>{currentSalah.athan}</Text>
        <Text className='text-white px-7 font-bold text-3xl'>{currentSalah.iqamah}</Text>
      </View>
      <View className='flex-row'>
        <Text className='text-white px-5 font-bold text-lg'>{timeToNextPrayer} left until {currentSalah.salah} iqamah</Text>
      </View>
        
      {/*<Text className='text-white'>Current Salah : {currentSalah.salah}</Text>
      <Text className='text-white'>Current Salah iqamah : {currentSalah.iqamah}</Text>
  <Text className='text-white'>Current Time : {currentTime} {"\n"}Time to next Prayer : {timeToNextPrayer}</Text>*/}
    </ImageBackground>
    </View>
  )
}