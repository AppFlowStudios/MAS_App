import { StyleSheet, View, FlatList} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgramsListProgram from "../../../components/ProgramsListProgram"
import programsData from '@/assets/data/programsData';
import { Divider } from 'react-native-paper';


export default function ProgramsScreen(){
  const seperator = () =>{
    return <Divider className='w-2 color-black'/>
  }
  return (
      <FlatList 
      data={programsData} 
      renderItem={({item}) => <ProgramsListProgram program={item}/>}
      ItemSeparatorComponent={() => <View className='h-1 rounded-20 w-[50%]'/>}
      />
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