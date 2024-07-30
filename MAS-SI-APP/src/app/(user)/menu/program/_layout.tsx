import { Stack } from "expo-router";
import ProgramProvider from "@/src/providers/programProvider";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
export default function programStack() {
    return (
        <Stack>
          <Stack.Screen name="programsAndEventsScreen" options={{headerShown : false, headerBackTitleVisible: false, headerTitle : "Back"}}/>
          <Stack.Screen name="allPrograms" options={ { title: "All Programs", headerShown: false } } />
          <Stack.Screen name="events/Event" options={ {headerShown : false} } />
          <Stack.Screen name="lectures"  options={{ headerTitle : ""}}/>
        </Stack> 
    )
  };
  