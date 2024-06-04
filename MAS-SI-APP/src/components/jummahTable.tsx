import { View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { gettingPrayerData, prayerTimeData } from '../types';
import React from 'react';

type JummahTimeProp = {
    jummah : gettingPrayerData
}
export default function JummahTable( {jummah} : JummahTimeProp ) {
  return (
    <DataTable style={ { justifyContent: "center", alignContent:"center", backgroundColor: "white", borderRadius: 20, paddingHorizontal: 20} }>
        <DataTable.Header style={{width: "90%"}}>
            <DataTable.Title  textStyle={{fontSize:17, fontWeight: 700, color: "black"}}>{jummah.jummah1}</DataTable.Title>
            <DataTable.Title textStyle={{fontSize:17, fontWeight: 700, color: "black", marginLeft:10}}>{jummah.jummah2}</DataTable.Title>
            <DataTable.Title textStyle={{fontSize:17, fontWeight: 700, color: "black", marginLeft:10,}}>1:45PM</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
            <DataTable.Cell> Jummah 1</DataTable.Cell>
            <DataTable.Cell>Jummah 2</DataTable.Cell>
            <DataTable.Cell>Jummah 3</DataTable.Cell>
        </DataTable.Row>
    </DataTable>
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