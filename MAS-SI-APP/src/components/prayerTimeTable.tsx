import { DataTable } from 'react-native-paper';
import { gettingPrayerData, prayerTimeData } from '@/src/types';
import ProgramWidgetSlider from "@/src/components/programWidgetSlider";
import {View, Text, useWindowDimensions, StyleSheet } from "react-native";
import AlertBell from '../app/(tabs)/menu/alertBell';
type prayerDataProp = {
    prayerData : gettingPrayerData,
  }
const Table = ( { prayerData } :  prayerDataProp) => {
  const { width } = useWindowDimensions();
    return(
      <View style={ {width} } className='items-center'>
        <View className='rounded-20 items-center'>
          <Text className="mt-2 text-23 font-bold">{prayerData.date} / {prayerData.hijri_month} {prayerData.hijri_date}</Text>
          <Text className='text-2xl font-bold text-[#57BA47]'>Prayer Times</Text> 
        </View>
     <View className='mt-1 w-[95%]'>
      <DataTable style={ {justifyContent: "center", alignContent:"center", backgroundColor: 'white', borderRadius: 50} }>
      <DataTable.Header style={{paddingHorizontal: 40}}>
        <DataTable.Title textStyle={{fontSize:20, color:"#0D509D", fontWeight: "bold", marginLeft:10}}>Salah</DataTable.Title>
        <DataTable.Title textStyle={{fontSize: 20, marginLeft: 15, color:"#0D509D", fontWeight: 700}}>Athan</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:20, marginLeft: 30, fontWeight: 700, color:"black"}}>Iqamah</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Fajr"}/></DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 19, fontSize: 17, color:"#0D509D" , fontWeight: 700}}>{prayerData.athan_fajr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 27, fontSize: 17, fontWeight: 700 }}>{prayerData.iqa_fajr}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Dhuhr"}/> </DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13,fontSize: 17, color:"#0D509D",fontWeight: 700 }}>{prayerData.athan_zuhr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 33,fontSize: 17, fontWeight: 700 }}>{prayerData.iqa_zuhr}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Asr"}/></DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:20, fontSize: 17, color:"#0D509D", fontWeight: 700 }}>{prayerData.athan_asr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 32, fontSize: 17, fontWeight: 700,  }}>{prayerData.iqa_asr}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Maghrib"}/></DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:20, fontSize: 17, color:"#0D509D" , fontWeight: 700}}>{prayerData.athan_maghrib}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 29, fontSize: 17, fontWeight: 700 }}>{prayerData.iqa_maghrib}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Isha"}/></DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13, fontSize: 17, color:"#0D509D", fontWeight: 700}}>{prayerData.athan_isha}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 25 , fontSize: 17, fontWeight: 700}}>{prayerData.iqa_isha}</DataTable.Cell>
      </DataTable.Row>
   </DataTable>
   </View>
   </View>
    )
}

export default Table

