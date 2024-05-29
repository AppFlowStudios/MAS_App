import { Image, StyleSheet, View, Text, } from 'react-native';
import { useState, useEffect } from 'react';
import { prayerTimeData, prayerTimesType } from '@/src/types';
import { DataTable } from 'react-native-paper';
import AlertBell from './alertBell';
type prayerDataProp = {
  prayerData : prayerTimeData
}


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
  })

    if (loading) {
      return (
        <Text> Loading....</Text>
      )
    }
    const Table = ( { prayerData } :  prayerDataProp) => {
      return(
      <DataTable style={ { justifyContent: "center", alignContent:"center", paddingHorizontal: 20} }>
        <DataTable.Header style={{width: "90%", position:"relative"}}>
          <DataTable.Title textStyle={{fontSize:20}}>Salah</DataTable.Title>
          <DataTable.Title textStyle={{fontSize: 20, marginLeft: 10}}>Athan</DataTable.Title>
          <DataTable.Title textStyle={{fontSize:20, marginLeft: 20}}>Iqamah</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row style={{borderBottomWidth: 0, justifyContent: "center", alignContent:"center"}}>
          <DataTable.Cell textStyle={{flexDirection:"row"}}><AlertBell/> Fajr</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft:13 }}>{prayerData.salah[0].fajr}</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft: 22 }}>{prayerData.iqamah[0].fajr}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{borderBottomWidth: 0}}>
          <DataTable.Cell>Dhuhr</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft:13 }}>{prayerData.salah[0].zuhr}</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft: 22 }}>{prayerData.iqamah[0].zuhr}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{borderBottomWidth: 0}}>
          <DataTable.Cell>Asr</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft:13 }}>{prayerData.salah[0].asr}</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft: 22 }}>{prayerData.iqamah[0].asr}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{borderBottomWidth: 0}}>
          <DataTable.Cell>Maghrib</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft:13 }}>{prayerData.salah[0].maghrib}</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft: 22 }}>{prayerData.iqamah[0].maghrib}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{borderBottomWidth: 0}}>
          <DataTable.Cell>Isha</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft:13 }}>{prayerData.salah[0].isha}</DataTable.Cell>
          <DataTable.Cell textStyle={{ marginLeft: 22 }}>{prayerData.iqamah[0].isha}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      )
    }
    return (
      <View>
        <View style={styles.container} className='backgroundColor'>
          < Image source={require("../../../../assets/images/massiLogo.png")} style={styles.massiLogo} />
          <Text className="mt-2">{prayerTimes.data.salah[0].date} /  {prayerTimes.data.salah[0].hijri_month} {prayerTimes.data.salah[0].hijri_date}</Text>
          <Text className='text-2xl font-bold mb-2'>Prayer Times</Text>
          <View className='w-50% m-auto'>
          <Table prayerData={prayerTimes.data}/>
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
    justifyContent: "center"
  },
});
