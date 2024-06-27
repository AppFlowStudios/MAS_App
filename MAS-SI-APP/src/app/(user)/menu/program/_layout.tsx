import { Stack } from "expo-router";
import ProgramProvider from "@/src/providers/programProvider";
export default function programStack() {
    return (
        <Stack>
          <Stack.Screen name="allPrograms" options={ {title: "All Programs", headerShown: false} } />
          <Stack.Screen name="lectures" options={{title: "Lecture" }} />
        </Stack> 
    )
  };
  