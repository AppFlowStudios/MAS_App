import { Stack } from "expo-router";
export default function programStack() {
    return (
        <Stack>
          <Stack.Screen name="programs" options={ {title: "Programs"} }/>
        </Stack> 
    )
  };
  