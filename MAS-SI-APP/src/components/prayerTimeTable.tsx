import { DataTable } from 'react-native-paper';
import { gettingPrayerData, prayerTimeData } from '@/src/types';
import ProgramWidgetSlider from "@/src/components/programWidgetSlider";
import {View, Text, useWindowDimensions, StyleSheet } from "react-native";
import JummahTable from './jummahTable';
type prayerDataProp = {
    prayerData : gettingPrayerData,
  }
const Table = ( { prayerData } :  prayerDataProp) => {
  const { width } = useWindowDimensions();
    return(
      <View style={ {width} }>
          <View className='rounded-20 items-center'>
          <Text className="mt-2 text-23 font-bold">{prayerData.date} /  {prayerData.hijri_month} {prayerData.hijri_date}</Text>
          <Text className='text-2xl font-bold text-[#57BA47]'>Prayer Times</Text> 
     </View>
     <View className='w-50% m-auto'>
      <DataTable style={ { justifyContent: "center", alignContent:"center", paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 50} }>
      <DataTable.Header style={{width: "90%", position:"relative"}}>
        <DataTable.Title textStyle={{fontSize:20, color:"#0D509D"}}>Salah</DataTable.Title>
        <DataTable.Title textStyle={{fontSize: 20, marginLeft: 10, color:"#0D509D", fontWeight: 500}}>Athan</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:20, marginLeft: 20, fontWeight: 700, color:"black"}}>Iqamah</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row style={{borderBottomWidth: 0, justifyContent: "center", alignContent:"center"}}>
        <DataTable.Cell textStyle={{fontSize:19, color: "#0D509D", fontWeight: 500}}>Fajr</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13, fontSize: 17, color:"#0D509D" , fontWeight: 500}}>{prayerData.athan_fajr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 22, fontSize: 17, fontWeight: 700 }}>{prayerData.iqa_fajr}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell textStyle={{fontSize: 19, color: "#0D509D", fontWeight: 500}}>Dhuhr</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13,fontSize: 17, color:"#0D509D",fontWeight: 500 }}>{prayerData.athan_zuhr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 22,fontSize: 17, fontWeight: 700 }}>{prayerData.athan_zuhr}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell textStyle={{fontSize: 19, color: "#0D509D", fontWeight: 500}}>Asr</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13, fontSize: 17, color:"#0D509D", fontWeight: 500 }}>{prayerData.athan_asr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 22, fontSize: 17, fontWeight: 700,  }}>{prayerData.iqa_asr}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell textStyle={{fontSize: 19, color: "#0D509D", fontWeight: 500}}>Maghrib</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13, fontSize: 17, color:"#0D509D" , fontWeight: 500}}>{prayerData.athan_maghrib}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 22, fontSize: 17, fontWeight: 700 }}>{prayerData.iqa_maghrib}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell textStyle={{fontSize: 19, color: "#0D509D", fontWeight: 500}}>Isha</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13, fontSize: 17, color:"#0D509D" , fontWeight: 500}}>{prayerData.athan_isha}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 22 , fontSize: 17, fontWeight: 700}}>{prayerData.iqa_isha}</DataTable.Cell>
      </DataTable.Row>
      <View className='w-[50%] m-auto'>
        <Text className='text-2xl font-bold text-[#57BA47]'>Jummah</Text>
      </View>
      <View className=''>
        <JummahTable jummah={prayerData}/>
    </View>
   </DataTable>
   </View>
   </View>
    )
}


export default Table

