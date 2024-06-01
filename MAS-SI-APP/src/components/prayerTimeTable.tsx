import { DataTable } from 'react-native-paper';
import { prayerTimeData } from '@/src/types';
import AlertBell from '../app/(tabs)/menu/alertBell';

type prayerDataProp = {
    prayerData : prayerTimeData
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
        <DataTable.Cell>Fajr</DataTable.Cell>
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

export default Table