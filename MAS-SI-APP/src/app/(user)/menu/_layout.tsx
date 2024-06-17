import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
export default function homeStack(){
    return(
        <BottomSheetModalProvider>
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="program"/>
        </Stack>
        </BottomSheetModalProvider>
    )
}