import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SavedProvider } from './context/SavedContext';
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function RootLayout() {
  LogBox.ignoreAllLogs(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <SavedProvider> {/* ✅ Wrap everything inside here */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{ headerShown: false, animation: 'fade' }}
          initialRouteName="index"
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)/mainPage" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SavedProvider>
  );
}
