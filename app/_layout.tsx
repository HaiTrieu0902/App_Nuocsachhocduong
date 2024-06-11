import { EROUTER } from '@/constants/enum';
import store, { persistor } from '@/core/store';
import useKeyboard from '@/hooks/useKeyboard';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../global.css';
import { getAuthToken } from '@/hooks/useStorage';
export default function _layout() {
  const [token, setToken] = useState<string | null>(null);
  useKeyboard();
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  console.log('token', token);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // Navigate to login after fonts are loaded
      router.push(EROUTER?.LOGIN);
      if (token) {
        router.push(EROUTER?.HOME);
      } else {
      }
    }
  }, [loaded, token]);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = await getAuthToken();
      setToken(token);
    };

    fetchTokenAndUser();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ToastProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={EROUTER.LOGIN}
          >
            {token ? (
              <>
                <Stack.Screen name="blog/index" options={{ headerTitle: 'All Blog Posts' }} />
                <Stack.Screen name={EROUTER.TABS} options={{ headerShown: false }} />

                {/* Profile */}
                <Stack.Screen name={EROUTER.PROFILE_INFOMATION} options={{ headerTitle: 'Profile Infomation' }} />
                <Stack.Screen name={EROUTER.PROFILE_CHANGE_PASS} options={{ headerTitle: 'Profile Change Password' }} />
                <Stack.Screen name={EROUTER.PROFILE_LIST_ORDER} options={{ headerTitle: 'Profile List Orders' }} />
                <Stack.Screen name={EROUTER.PROFILE_LIST_SCHOOL} options={{ headerTitle: 'Profile List School' }} />
              </>
            ) : (
              <>
                <Stack.Screen name={EROUTER.LOGIN} options={{ headerTitle: 'Home' }} />
                <Stack.Screen name={EROUTER.FORGOTPASSWORD} options={{ headerTitle: 'Forgot Password' }} />
                <Stack.Screen name={EROUTER.RESETPASSWORD} options={{ headerTitle: 'Reset Password' }} />
                <Stack.Screen name={EROUTER.VERIFYOTP} options={{ headerTitle: 'Verify OTP' }} />
              </>
            )}

            <Stack.Screen name={EROUTER.NOTFOUND} />
          </Stack>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}
