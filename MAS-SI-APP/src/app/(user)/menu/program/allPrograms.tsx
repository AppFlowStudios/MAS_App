import { StyleSheet, View, FlatList} from 'react-native';
import { Stack } from "expo-router";
import ProgramsListProgram from "../../../../components/ProgramsListProgram"
import programsData from '@/assets/data/programsData';
import { Divider } from 'react-native-paper';


export default function ProgramsScreen(){
  const seperator = () =>{
    return (
    <View style={{ alignItems: "center", marginVertical: 8}}>
      <Divider style={{height: 1, width: "50%",}}/>
    </View>
  )
  }
  return (
    <View>
      <Stack.Screen options={{title: "All Programs"}}/>
      <FlatList 
      data={programsData} 
      renderItem={({item}) => <ProgramsListProgram program={item}/>}
      ItemSeparatorComponent={() => seperator()}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  programContainer: {
    flex: 1,
    padding: 20
  },
  programButtons: {
    justifyContent: "center"
  },
}
)