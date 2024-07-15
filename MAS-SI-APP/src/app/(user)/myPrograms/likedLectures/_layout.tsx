import { Stack } from "expo-router"

export default function likedLecturesLayout (){
    return(
        <Stack>
            <Stack.Screen name="AllLikedLectures" options={{headerShown : false}}/>
        </Stack>
    )
}