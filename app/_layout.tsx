import { View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, router } from 'expo-router';

export default function _layout() {
  /** EFFECT CHANEG TO AUTH LOGIN */
  useEffect(() => {
    router.push('auth/login');
  }, []);

  return (
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
  );
}
