import { Stack } from "expo-router";

export default function MyProgramsStack(){
    return(
        <Stack>
            <Stack.Screen name="userPrograms" options={{headerShown: false}}/>
            <Stack.Screen name="PlaylistIndex" options={{title : "Playlists", headerBackTitleVisible: false}}/>
            <Stack.Screen name="likedLectures" options={{ title : "Favorite Lectures"}}/>
            <Stack.Screen name="[programId]" />
        </Stack>
    )
}