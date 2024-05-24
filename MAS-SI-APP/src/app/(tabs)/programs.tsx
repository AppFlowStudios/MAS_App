import { StyleSheet, Image, Platform, View, Text, Button, TouchableOpacity , FlatList} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SaturdayLecs from './saturdayLecs';
import WednesdayLecs from './wednesdayLecs';
import ProgramsListProgram from "../../components/ProgramsListProgram"
import programsData from '@/assets/data/programsData';
const Stack = createNativeStackNavigator();

function ProgramsScreen( {navigation} : any ){
  return (
    <View>
      { /*<ProgramsListProgram program={programsData[0]}/>
      <ProgramsListProgram program={programsData[1]}/> */}
      <FlatList 
      data={programsData} 
      renderItem={({item}) => <ProgramsListProgram program={item}/>}
      />
    </View>
  )
}

export default function ProgramStack() {
  return (
      <Stack.Navigator >
        <Stack.Screen name="Programs" component={ProgramsScreen}/>
        <Stack.Screen name="Saturday Lectures" component={SaturdayLecs}/>
        <Stack.Screen name="Wednesday Lectures" component={WednesdayLecs}/>
      </Stack.Navigator> 
  )
};

const styles = StyleSheet.create({
  programContainer: {
    flex: 1,
    padding: 20
  },
  programButtons: {
    justifyContent: "center"
  },
  programsText: {
    
  }
}
)