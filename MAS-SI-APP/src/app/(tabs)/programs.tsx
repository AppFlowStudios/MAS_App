import { StyleSheet, Image, Platform, View, Text, Button, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SaturdayLecs from './saturdayLecs';
import WednesdayLecs from './wednesdayLecs';
const Stack = createNativeStackNavigator();

function ProgramsScreen( {navigation} : any ){
  return (
    <View>
      <TouchableOpacity style={styles.programButtons} onPress={() => navigation.navigate("Saturday Lectures")}>
        <Text>Saturday Lectures</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.programButtons} onPress={() => navigation.navigate("Wednesday Lectures")}>
        <Text>Wednesday Lectures</Text>
      </TouchableOpacity>

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