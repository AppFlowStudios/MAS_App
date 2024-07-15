import { Stack } from "expo-router";

export default function MyProgramsStack(){
    return(
        <Stack>
            <Stack.Screen name="userPrograms" options={{headerShown: false, title: "My Library"}}/>
            <Stack.Screen name="PlaylistIndex" options={{title : "Playlists"}}/>
            <Stack.Screen name="likedLectures" options={{ title : "Favorite Lectures"}}/>
            <Stack.Screen name="[programId]" />
        </Stack>
    )
}