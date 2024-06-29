import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { JummahBottomSheetProp, gettingPrayerData, prayerTimeData } from '../types';
import { JummahBottomSheet } from './jummahBottomSheet';
import React, { useRef, forwardRef, useState } from 'react';
import {BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
type JummahTimeProp = {
    jummah : gettingPrayerData
}

type jummahTableProp = {
  jummahData : JummahBottomSheetProp[]
}

type Ref = BottomSheetModal;
export const JummahTable = forwardRef<Ref,jummahTableProp>(({jummahData}, ref) => {
  const [ clickedState, setClickedState ] = useState(0)
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const handlePresentModalPress = () => bottomSheetRef.current?.present();

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  
  return (
    <>
      <View className='flex-row justify-center items-center pt-5'>
          <Text className='text-white font-bold text-2xl mb-4' style={{textShadowColor: "#000", textShadowOffset: { width: 0.5, height: 3 }, textShadowRadius: 1 }}>Jummah Schedule</Text>
      </View>
      <View className="ml-14 mr-14"style={{height: 375, borderTopWidth: 5, borderRightWidth: 5, borderLeftWidth: 5, borderBottomWidth: 5 ,borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderColor: "white"}}>
        <ScrollView className='flex-col pt-3'  contentContainerStyle={{justifyContent: "center",  alignItems : "center"}} >
            <TouchableOpacity style={{height:75, width:250 }} className=' justify-center items-center rounded-lg bg-[#cdcdcd]' onPress={handlePresentModalPress} onPressIn={() => {setClickedState(0)}} >
              <Text>12:15PM</Text>
              <Text>Jummah 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height:75, width:250}} className='justify-center items-center rounded-lg  bg-[#cdcdcd] mt-3' onPress={handlePresentModalPress} onPressIn={() => {setClickedState(1)}}>
              <Text>1:00PM</Text>
              <Text>Jummah 2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:75, width:250}} className='justify-center items-center rounded-lg bg-[#cdcdcd] mt-3' onPress={handlePresentModalPress}  onPressIn={() => {setClickedState(2)}}>
              <Text>1:45PM</Text>
              <Text>Jummah 3</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:75, width:250}} className='justify-center items-center rounded-lg bg-[#cdcdcd] mt-3' onPress={handlePresentModalPress} onPressIn={() => {setClickedState(3)}}>
              <Text>3:40PM</Text>
              <Text>Student Jummah</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
      <JummahBottomSheet jummahSpeaker={jummahData[clickedState].jummahSpeaker} jummahSpeakerImg={jummahData[clickedState].jummahSpeakerImg} jummahTopic={jummahData[clickedState].jummahTopic} ref={bottomSheetRef} />
      </>
  )
}
)


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