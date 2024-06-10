import { View, Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { gettingPrayerData, prayerTimeData } from '../types';
import React from 'react';

type JummahTimeProp = {
    jummah : gettingPrayerData
}
export default function JummahTable() {
  return (
    <View className=''>
      <View className='flex-row justify-center items-center'>
          <Text className='text-[#57BA47] font-bold text-2xl'>Friday Prayer</Text>
      </View>
      <View className='flex-row justify-center items-center gap-x-10'>
          <TouchableOpacity style={{height:100, width:150 }} className=' justify-center items-center rounded-lg bg-gray-500 '>
            <Text>12:15PM</Text>
            <Text>Jummah 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height:100, width:150}} className='justify-center items-center rounded-lg  bg-gray-500 '>
            <Text>1:00PM</Text>
            <Text>Jummah 2</Text>
          </TouchableOpacity>
      </View>
      <View style={{marginTop: 5}}></View>
      <View className='flex-row items-center justify-center gap-x-10'>
          <TouchableOpacity style={{height:100, width:150}} className='justify-center items-center rounded-lg bg-gray-500 '>
            <Text>1:45PM</Text>
            <Text>Jummah 3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:100, width:150}} className='justify-center items-center rounded-lg bg-gray-500 '>
            <Text>3:40PM</Text>
            <Text>Student Jummah</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}


/*{<DataTable.Header style={{width: "90%", position:"relative"}}>
<DataTable.Title  textStyle={{fontSize:20, color: "#0D509F"}}>   Salah </DataTable.Title>
<DataTable.Title style={{marginLeft: 50}} textStyle={{fontSize:20, fontWeight: 700, color: "black"}}> Iqamah </DataTable.Title>
</DataTable.Header>
<DataTable.Row style={{ borderBottomWidth:0, alignItems:"center"}}>
<DataTable.Cell textStyle={{color: "#0D509F", fontSize:19, fontWeight: 500}}>Jummah 1 </DataTable.Cell>
<DataTable.Cell style={{marginLeft:"20%"}}   textStyle={{fontWeight: 700, fontSize: 17}}> {jummah.iqamah[0].jummah1} </DataTable.Cell>
</DataTable.Row>}*/



{   /* <DataTable style={ { justifyContent: "center", alignContent:"center", backgroundColor: "white", borderRadius: 20} }>
        <DataTable.Header style={{paddingHorizontal: 20}}>
            <DataTable.Title  textStyle={{fontSize:17, fontWeight: 700, color: "black"}}>12:15PM</DataTable.Title>
            <DataTable.Title textStyle={{fontSize:17, fontWeight: 700, color: "black", marginLeft:10}}>1:00PM</DataTable.Title>
            <DataTable.Title textStyle={{fontSize:17, fontWeight: 700, color: "black", marginLeft:10}}>1:45PM</DataTable.Title>
            <DataTable.Title textStyle={{fontSize:17, fontWeight: 700, color: "black", marginLeft:10,}}>3:40PM</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row style={{borderBottomWidth: 0, paddingHorizontal: 20}}>
            <DataTable.Cell textStyle={{color: "#0D509D", fontWeight:700, fontSize: 15}}>Jummah 1</DataTable.Cell>
            <DataTable.Cell style={{marginLeft:10}} textStyle={{color: "#0D509D", fontWeight:700, fontSize: 15}}>Jummah 2</DataTable.Cell>
            <DataTable.Cell style={{marginLeft:13}} textStyle={{color: "#0D509D", fontWeight:700, fontSize: 15}}>Jummah 3</DataTable.Cell>
            <DataTable.Cell style={{marginLeft:17}} textStyle={{color: "#0D509D", fontWeight:700, fontSize: 15}}>Student</DataTable.Cell>
        </DataTable.Row>
  </DataTable> */}