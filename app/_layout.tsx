import { View, Text, Button, useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import { SplashScreen, Stack, router } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import '../global.css';
export default function _layout() {
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
            headerRight: () => (
              <Button
                onPress={() => {
                  router.push('contact');
                }}
                title="Contact"
              />
            ),
          }}
        />
        <Stack.Screen name="blog/index" options={{ headerTitle: 'All Blog Posts' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
