import { DataTable, Icon, IconButton } from 'react-native-paper';
import { gettingPrayerData, prayerTimeData } from '@/src/types';
import ProgramWidgetSlider from "@/src/components/programWidgetSlider";
import {View, Text, useWindowDimensions, StyleSheet, Pressable, ImageBackground } from "react-native";
import AlertBell from '../app/(user)/menu/alertBell';
import { usePrayer } from '../providers/prayerTimesProvider';

type prayerDataProp = {
    prayerData : gettingPrayerData,
    setTableIndex : ( tableIndex : number ) => void
    tableIndex : number
    index : number
  }
const Table = ( { prayerData, setTableIndex, tableIndex, index } :  prayerDataProp) => {
  const { currentPrayer } = usePrayer()
  const { width, height } = useWindowDimensions();
  const nextPress = () => {
    const nextPressNum = Math.ceil(index + 1)
    setTableIndex(Math.min(6,nextPressNum))
  }
  const backPress = () => {
    setTableIndex(Math.max(0,index - 1))
  }
    return(
      <View style={ { width : width  } } className='items-center' >
        <View className='items-center justify-center  w-[95%] ' >
            <View className='flex-row justify-center items-center  p-2 rounded-3xl bg-white' style={{ shadowColor : 'black', shadowOffset : { width : 0,  height : 3}, shadowOpacity : 1, shadowRadius : 4 }}>
              <Pressable onPress={backPress}>
                <Icon source="chevron-left" size={30} color='black' />
              </Pressable>
              <View className='flex-col items-center justify-center'>
                <Text className="text- font-bold">{prayerData.date}</Text>
                <Text className='text-23 font-bold text-gray-400'>{prayerData.hijri_month} {prayerData.hijri_date}</Text>
              </View>
              <Pressable onPress={nextPress}>
                <Icon source="chevron-right" size={30} color='black'/>
              </Pressable>
            </View>
          <View className='mt-3 w-[100%]'>

            <DataTable style={ { backgroundColor: 'white', borderRadius: 8, shadowColor: "black", shadowOffset: {width : 0, height: 0}, shadowOpacity: 1, shadowRadius: 2, width : '100%',} } className=''>

            <DataTable.Header style={{ justifyContent : 'space-between', alignItems : 'center'}} className=''>
              <DataTable.Title textStyle={{fontSize:20, color:"#0D509D", fontWeight: "bold", textAlign : 'right' }} >Salah</DataTable.Title>
              <DataTable.Title textStyle={{fontSize: 20,  color:"#0D509D", fontWeight: 700}} >Athan</DataTable.Title>
              <DataTable.Title textStyle={{fontSize:20, fontWeight: 700, color:"black", textAlign : 'right'}} numeric>Iqamah</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row style={{borderBottomWidth: 0, justifyContent : 'space-between', backgroundColor : currentPrayer == 'Fajr' ? 'rgba(147, 250, 165, 0.5)' : ''}}>
              <DataTable.Cell><AlertBell salah={"Fajr"}/></DataTable.Cell>
              <DataTable.Cell textStyle={{  fontSize: 17, color:"#0D509D" , fontWeight: 700}}>{prayerData.athan_fajr}</DataTable.Cell>
              <DataTable.Cell textStyle={{  fontSize: 17, fontWeight: 700, color: 'black' }} numeric>{prayerData.iqa_fajr}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={{borderBottomWidth: 0, justifyContent : 'space-between', backgroundColor : currentPrayer == 'Dhuhr' ? 'rgba(147, 250, 165, 0.5)' : ''}}>
              <DataTable.Cell><AlertBell salah={"Dhuhr"}/> </DataTable.Cell>
              <DataTable.Cell textStyle={{ fontSize: 17, color:"#0D509D",fontWeight: 700 }}>{prayerData.athan_zuhr}</DataTable.Cell>
              <DataTable.Cell textStyle={{ fontSize: 17, fontWeight: 700, color: 'black' }} numeric>{prayerData.iqa_zuhr}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={{borderBottomWidth: 0, justifyContent : 'space-between', backgroundColor : currentPrayer == 'Asr' ? 'rgba(147, 250, 165, 0.5)' : ''}}>
              <DataTable.Cell><AlertBell salah={"Asr"}/></DataTable.Cell>
              <DataTable.Cell textStyle={{  fontSize: 17, color:"#0D509D", fontWeight: 700 }}>{prayerData.athan_asr}</DataTable.Cell>
              <DataTable.Cell textStyle={{  fontSize: 17, fontWeight: 700, color: 'black' }} numeric>{prayerData.iqa_asr}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={{borderBottomWidth: 0, justifyContent : 'space-between', backgroundColor : currentPrayer == 'Maghrib' ? 'rgba(147, 250, 165, 0.5)' : ''}}>
              <DataTable.Cell><AlertBell salah={"Maghrib"}/></DataTable.Cell>
              <DataTable.Cell textStyle={{  fontSize: 17, color:"#0D509D" , fontWeight: 700}}>{prayerData.athan_maghrib}</DataTable.Cell>
              <DataTable.Cell textStyle={{  fontSize: 17, fontWeight: 700, color: 'black' }} numeric>{prayerData.iqa_maghrib}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={{borderBottomWidth: 0, justifyContent : 'space-between', backgroundColor : currentPrayer == 'Isha' ? 'rgba(147, 250, 165, 0.5)' : ''}}>
              <DataTable.Cell><AlertBell salah={"Isha"}/></DataTable.Cell>
              <DataTable.Cell textStyle={{  fontSize: 17, color:"#0D509D", fontWeight: 700}}>{prayerData.athan_isha}</DataTable.Cell>
              <DataTable.Cell textStyle={{  fontSize: 17, fontWeight: 700, color: 'black'}} numeric>{prayerData.iqa_isha}</DataTable.Cell>
            </DataTable.Row>
        </DataTable>
      </View>
      </View>
    </View>
    )
}

export default Table

