import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import PrayerTimesProvider from '../providers/prayerTimesProvider';
import { useColorScheme } from '../../hooks/useColorScheme';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { MenuProvider } from "react-native-popup-menu"
import AuthProvider from '../providers/AuthProvider';// Prevent the splash screen from auto-hiding before asset loading is complete.
import { StripeProvider } from '@stripe/stripe-react-native'
import NotificationProvider from '../providers/NotificationProvider';
import { Text } from 'react-native'
export default function RootLayout() {
  const colorScheme = useColorScheme();
  interface TextWithDefaultProps extends Text {
        defaultProps?: { allowFontScaling?: boolean };
  }

  ((Text as unknown) as TextWithDefaultProps).defaultProps =
  ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
  ((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    'Oleo' : require('../../assets/fonts/OleoScript-Regular.ttf'),
  });
  useEffect(() => {
    async function hideSplash() {
      await SplashScreen.preventAutoHideAsync(); // Ensure splash stays visible at first
      if (loaded) {
        setTimeout(async () => {
          await SplashScreen.hideAsync(); // Hide it with a slight delay
        }, 50); // A short delay to prevent animation glitches
      }
    }
    hideSplash();
  }, [loaded]);
  
  
  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}>
        <AuthProvider>
          <PrayerTimesProvider>
            {/* <NotificationProvider> */}
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <BottomSheetModalProvider>
                  <MenuProvider>
                    <PaperProvider>
                    <Stack key={Date.now()}>
                    <Stack.Screen name="(user)" options={{ headerShown: false, animation: 'none' }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'none' }} />
                    <Stack.Screen name="+not-found" options={{ animation: 'none' }} />
                    </Stack>
                    </PaperProvider>
                  </MenuProvider>
                </BottomSheetModalProvider>
              </ThemeProvider>
            {/* </NotificationProvider> */}
          </PrayerTimesProvider>
        </AuthProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
