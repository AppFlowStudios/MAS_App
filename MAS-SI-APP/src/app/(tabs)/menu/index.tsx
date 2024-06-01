import { Image, StyleSheet, View, Text, } from 'react-native';
import { useState, useEffect } from 'react';
import { prayerTimesType } from '@/src/types';
import JummahTable from '@/src/components/jummahTable';
import Table from '@/src/components/prayerTimeTable';



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

  const masjidalAPIURL = "https://masjidal.com/api/v1/time/range?masjid_id=3OA8V3Kp"

  useEffect( () => {
    fetch(masjidalAPIURL)
      .then( (response) => response.json() )
      .then( (json) => setPrayerTimes(json) )
      .catch( (error) =>  console.error(error))
      .finally( () => setLoading(false))
  }, [])

    if (loading) {
      return (
        <Text> Loading....</Text>
      )
    }
    console.log("Function Called")
    return (
      <View className='bg-white h-full'>
        <View style={styles.container}>
          < Image source={require("../../../../assets/images/massiLogo.png")} style={styles.massiLogo} />
          <Text className="mt-2">{prayerTimes.data.salah[0].date} /  {prayerTimes.data.salah[0].hijri_month} {prayerTimes.data.salah[0].hijri_date}</Text>
          <Text className='text-2xl font-bold'>Prayer Times</Text>
          <View className='w-50% m-auto'>
            <Table prayerData={prayerTimes.data}/>
          </View>
          <View className=''>
              <JummahTable jummah={prayerTimes.data}/>
          </View>
      </View>


      </View>
    )
    
  }

    



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
    alignItems: "center",
  },
  masLogoBox: {
    width: 300,
    height: 100
  },
  massiLogo : {
    marginTop: 50,
    width: 300,
    height: 100,
    resizeMode: "contain",
    justifyContent: "center",
  },
});
