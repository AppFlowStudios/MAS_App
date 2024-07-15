import { Stack } from "expo-router";
const EventStack = () => {
  return (
    <Stack>
        <Stack.Screen name="Event" options={{headerShown: false}} />
    </Stack>
  )
}

export default EventStack