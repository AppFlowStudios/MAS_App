import { StyleSheet, View, FlatList, Button} from 'react-native';
import { Stack } from "expo-router";
import ProgramsListProgram from "../../../../components/ProgramsListProgram"
import programsData from '@/assets/data/programsData';
import { Divider } from 'react-native-paper';
import { useState } from 'react';
import { Program } from "@/src/types"
import { Input, Text, Icon } from "@ui-kitten/components"
import {EvaIconsPack} from '@ui-kitten/eva-icons';

export default function ProgramsScreen(){
  const [ shownData, setShownData ] = useState<Program[]>(programsData)
  const [ searchBarInput, setSearchBarInput ] = useState('')
  const filterTest = programsData.filter((program) => {
    return program.programName.includes("Vic")
  })


  const filterTestFunc = (searchParam : string) => {
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
  const searchIcon = () => {
    return (<Icon name='search' style={{width: 20, height: 20}} />
    )
  };

  return (
   <View className=' bg-white rounded-50 h-[100vh] ' >
      <Input placeholder='Search...' value={searchBarInput} onChangeText={next => {setSearchBarInput(next); filterTestFunc(next)} } accessoryRight={searchIcon}/>
      <FlatList 
        data={shownData} 
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