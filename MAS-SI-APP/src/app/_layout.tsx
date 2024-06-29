import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import PrayerTimesProvider from '../providers/prayerTimesProvider';
import { useColorScheme } from '../../hooks/useColorScheme';
import ProgramProvider from '../providers/programProvider';
import AddProgramProvider from '../providers/addingProgramProvider';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <AddProgramProvider>
        <ProgramProvider>
          <PrayerTimesProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}>
                    <Stack>
                      <Stack.Screen name="(user)" options={{ headerShown: false }} />
                      <Stack.Screen name="+not-found" />
                    </Stack>
                    
                  </ApplicationProvider>
            </ThemeProvider>
          </PrayerTimesProvider>
        </ProgramProvider>
      </AddProgramProvider>
    </GestureHandlerRootView>
  );
}
