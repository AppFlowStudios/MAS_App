import { StyleSheet, View, FlatList, Button} from 'react-native';
import { Stack } from "expo-router";
import ProgramsListProgram from "../../../../components/ProgramsListProgram"
import programsData from '@/assets/data/programsData';
import { Divider, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { Program } from "@/src/types"
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
export default function ProgramsScreen(){
  const [ shownData, setShownData ] = useState<Program[]>(programsData)
  const [ searchBarInput, setSearchBarInput ] = useState('')
  const tabBarHeight = useBottomTabBarHeight() + 30;
  const filterTestFunc = (searchParam : string) => {
    setSearchBarInput(searchParam)
    const filterTest = programsData.filter((program) => {
      return program.programName.includes(searchParam)
    })
    setShownData(filterTest)
  }

  const seperator = () =>{
    return (
    <View style={{ alignItems: "center", marginVertical: 3}}>
      <Divider style={{height: 1, width: "50%",}}/>
    </View>
  )
  }


  return (
   <View className=' bg-[#0D509D] flex-1' >
      <View className='bg-white pt-2 mt-1 flex-1'style={{borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingBottom: tabBarHeight}}>
      <Searchbar placeholder='Search...' onChangeText={filterTestFunc} value={searchBarInput} className='mt-2 w-[95%] mb-2' style={{alignSelf : "center", justifyContent: "center"}} elevation={1}/>
      <FlatList 
        data={shownData} 
        renderItem={({item}) => <ProgramsListProgram program={item}/>}
        ItemSeparatorComponent={() => seperator()}
      />
      </View>
    </View>
  )
}
