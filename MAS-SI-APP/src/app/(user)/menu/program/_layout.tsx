import { Stack } from "expo-router";
import ProgramProvider from "@/src/providers/programProvider";
export default function programStack() {
    return (
        <Stack>
          <Stack.Screen name="programsAndEventsScreen" options={{headerShown : false, headerBackTitleVisible: false, headerTitle : "Back"}}/>
          <Stack.Screen name="allPrograms" options={ {title: "All Programs", headerShown: false} } />
          <Stack.Screen name="events" options={ {headerShown : false} } />
          <Stack.Screen name="lectures" options={{title: "Lecture" }} />
        </Stack> 
    )
  };
  