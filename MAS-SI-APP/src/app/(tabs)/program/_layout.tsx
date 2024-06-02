import { Stack } from "expo-router";
import ProgramProvider from "@/src/providers/programProvider";
export default function programStack() {
    return (
      <ProgramProvider>
        <Stack>
          <Stack.Screen name="programs" options={ {title: "Programs"} } />
          <Stack.Screen name="lectures" options={{title: "Lecture" }} />
        </Stack> 
      </ProgramProvider>  
    )
  };
  