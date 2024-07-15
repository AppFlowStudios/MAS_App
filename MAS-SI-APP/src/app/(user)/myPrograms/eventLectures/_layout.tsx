import { Stack } from "expo-router";

export default function eventLectureStack(){
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="[lectureID]" options={ {title: "Lectures"} }/>
        </Stack>
    )
}