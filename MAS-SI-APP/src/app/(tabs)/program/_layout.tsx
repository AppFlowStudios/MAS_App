import { Stack } from "expo-router";
export default function ProgramStack() {
    return (
        <Stack>
          <Stack.Screen name="programs" options={ {title: "Programs"} }/>
        </Stack> 
    )
  };
  