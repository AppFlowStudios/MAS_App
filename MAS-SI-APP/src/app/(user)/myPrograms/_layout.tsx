import { Stack } from "expo-router";

export default function MyProgramsStack(){
    return(
        <Stack>
            <Stack.Screen name="userPrograms"/>
            <Stack.Screen name="[programId]" />
        </Stack>
    )
}