import { Stack } from "expo-router";

export default function homeStack(){
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
        </Stack>
    )
}