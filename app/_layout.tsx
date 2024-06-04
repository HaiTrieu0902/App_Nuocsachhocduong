import useKeyboard from '@/hooks/useKeyboard';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import React, { useEffect } from 'react';
import { Button, useColorScheme } from 'react-native';
import '../global.css';
import { ToastProvider } from 'react-native-toast-notifications';
export default function _layout() {
  useKeyboard();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // Navigate to login after fonts are loaded
      router.push('auth/login');
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ToastProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="auth/login"
        >
          <Stack.Screen
            name="auth/login"
            options={{
              headerTitle: 'Home',
            }}
          />
          <Stack.Screen name="auth/forgotPassword" options={{ headerTitle: 'Forgot Password' }} />
          <Stack.Screen name="blog/index" options={{ headerTitle: 'All Blog Posts' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ToastProvider>
    </ThemeProvider>
  );
}
