import { DataTable, Icon, IconButton } from 'react-native-paper';
import { gettingPrayerData, prayerTimeData } from '@/src/types';
import ProgramWidgetSlider from "@/src/components/programWidgetSlider";
import {View, Text, useWindowDimensions, StyleSheet, Pressable } from "react-native";
import AlertBell from '../app/(user)/menu/alertBell';

type prayerDataProp = {
    prayerData : gettingPrayerData,
    setTableIndex : ( tableIndex : number ) => void
    tableIndex : number
  }
const Table = ( { prayerData, setTableIndex, tableIndex } :  prayerDataProp) => {
  const { width, height } = useWindowDimensions();
  const nextPress = () => {
    setTableIndex(Math.min(6,tableIndex + 1))
  }
  const backPress = () => {
    setTableIndex(Math.max(0,tableIndex - 1))
  }
    return(
      <View style={ { width : width  } } className='items-center' >
        <View className='items-center justify-center  w-[95%] bg-white' >
          <View className='flex-row justify-center items-center'>
            <Pressable onPress={backPress}>
              <Icon source="chevron-left" size={30} color='black' />
            </Pressable>
            <Text className="text-23 font-bold">{prayerData.date} / {prayerData.hijri_month} {prayerData.hijri_date}</Text>
            <Pressable onPress={nextPress}>
              <Icon source="chevron-right" size={30} color='black'/>
            </Pressable>
          </View>
            <Text className='text-2xl font-bold text-[#57BA47]'>Prayer Times</Text> 
     <View className='mt-3 w-[100%]'>

      <DataTable style={ {justifyContent: "center", backgroundColor: 'white', borderRadius: 8, shadowColor: "black", shadowOffset: {width : 0, height: 0}, shadowOpacity: 1, shadowRadius: 2,} } className=''>

      <DataTable.Header style={{}}>
        <DataTable.Title textStyle={{fontSize:20, color:"#0D509D", fontWeight: "bold", marginLeft:10}}>Salah</DataTable.Title>
        <DataTable.Title textStyle={{fontSize: 20, marginLeft: 15, color:"#0D509D", fontWeight: 700}}>Athan</DataTable.Title>
        <DataTable.Title textStyle={{fontSize:20, marginLeft: 30, fontWeight: 700, color:"black"}}>Iqamah</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Fajr"}/></DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 19, fontSize: 17, color:"#0D509D" , fontWeight: 700}}>{prayerData.athan_fajr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 27, fontSize: 17, fontWeight: 700, color: 'black' }}>{prayerData.iqa_fajr}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Dhuhr"}/> </DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13,fontSize: 17, color:"#0D509D",fontWeight: 700 }}>{prayerData.athan_zuhr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 33,fontSize: 17, fontWeight: 700, color: 'black' }}>{prayerData.iqa_zuhr}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Asr"}/></DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:20, fontSize: 17, color:"#0D509D", fontWeight: 700 }}>{prayerData.athan_asr}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 32, fontSize: 17, fontWeight: 700, color: 'black' }}>{prayerData.iqa_asr}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Maghrib"}/></DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:20, fontSize: 17, color:"#0D509D" , fontWeight: 700}}>{prayerData.athan_maghrib}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 29, fontSize: 17, fontWeight: 700, color: 'black' }}>{prayerData.iqa_maghrib}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{borderBottomWidth: 0}}>
        <DataTable.Cell><AlertBell salah={"Isha"}/></DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft:13, fontSize: 17, color:"#0D509D", fontWeight: 700}}>{prayerData.athan_isha}</DataTable.Cell>
        <DataTable.Cell textStyle={{ marginLeft: 25 , fontSize: 17, fontWeight: 700, color: 'black'}}>{prayerData.iqa_isha}</DataTable.Cell>
      </DataTable.Row>
   </DataTable>
   </View>
   </View>
   </View>
    )
}

export default Table

