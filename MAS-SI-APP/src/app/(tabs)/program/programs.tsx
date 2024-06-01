import { StyleSheet, View, FlatList} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgramsListProgram from "../../../components/ProgramsListProgram"
import programsData from '@/assets/data/programsData';
const Stack = createNativeStackNavigator();

export default function ProgramsScreen( {navigation} : any ){
  return (
    <View>
      <FlatList 
      data={programsData} 
      renderItem={({item}) => <ProgramsListProgram program={item}/>}
      ItemSeparatorComponent={() => <View className='h-1 rounded-20'/>}
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
  programsText: {
    
  }
}
)