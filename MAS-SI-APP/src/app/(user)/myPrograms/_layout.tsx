import { Stack } from "expo-router";

export default function MyProgramsStack(){
    return(
        <Stack>
            <Stack.Screen name="userPrograms" options={{title: "My Library"}}/>
            <Stack.Screen name="[programId]" />
        </Stack>
    )
}