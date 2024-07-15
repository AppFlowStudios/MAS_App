import { Stack } from "expo-router"
const PlaylistLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="PlaylistIndex" options={{headerShown : false}}/>
        <Stack.Screen name="likedLectures" options={{headerShown: false}} />
    </Stack>
  )
}

export default PlaylistLayout