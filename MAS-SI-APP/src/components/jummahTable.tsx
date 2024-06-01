import { View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { prayerTimeData } from '../types';
import React from 'react';

type JummahTimeProp = {
    jummah : prayerTimeData
}
export default function JummahTable( {jummah} : JummahTimeProp ) {
  return (
    <DataTable style={ { justifyContent: "center", alignContent:"center", paddingHorizontal: 20} }>
        <DataTable.Header style={{width: "90%", position:"relative"}}>
            <DataTable.Title style={{justifyContent:"center"}}  textStyle={{fontSize:25, fontWeight: 600, color:"black"}}> Jummah </DataTable.Title>
        </DataTable.Header>
        <DataTable.Row style={{ borderBottomWidth:0, alignItems:"center"}}>
            <DataTable.Cell> Jummah 1 </DataTable.Cell>
            <DataTable.Cell style={{marginLeft:"50%"}}> {jummah.iqamah[0].jummah1} </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell> Jummah 2 </DataTable.Cell>
            <DataTable.Cell style={{marginLeft:"50%"}}> {jummah.iqamah[0].jummah2} </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell> Student Jummah </DataTable.Cell>
            <DataTable.Cell style={{marginLeft:"50%"}}> 3:40PM </DataTable.Cell>
        </DataTable.Row>
    </DataTable>
  )
}