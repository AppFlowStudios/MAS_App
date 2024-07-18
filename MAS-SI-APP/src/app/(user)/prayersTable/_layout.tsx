import { Stack } from "expo-router";

export default function TestStack(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="Quran/Quran" options={{ title : "Quran", headerBackTitleVisible : false }} />

        </Stack>
    )
}