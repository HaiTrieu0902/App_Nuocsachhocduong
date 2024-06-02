import { View, Text, Button, Keyboard } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useForm } from 'react-hook-form';
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { styleButton, styleInput } from '@/constants';
import { ILoginParams } from '@/models/auth.model';
import { loginAPI } from '@/services/api/auth.api';
const LoginScreen = () => {
  const [padding, setPadding] = useState<number>(100);
  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur',
    defaultValues: { password: '', email: '' },
  });

  /** handle submit login */
  const handleLogin = useCallback(async (values: ILoginParams) => {
    try {
      Keyboard.dismiss();
      const res = await loginAPI({ ...values, deviceLogin: 'web' });

      router.push('feed/new');
      // onGlobalLoading();
      // const response = await loginAPI(value);
      // const { token, ...user } = response;
      // setUser(user);
      // storage.set(STORAGE_KEYS.TOKEN, token);
      // storage.set(STORAGE_KEYS.USER_VALUE, JSON.stringify(user));
      // await registerTokenFCM();
    } catch (e: any) {
      console.error('📢 [login.tsx:31] Error:', e);
      // showToast({ message: e?.data?.message || 'Đăng nhập không thành công', type: 'error' });
    } finally {
      // offGlobalLoading();
    }
  }, []);

  /** USEEFFECT */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setPadding(30));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setPadding(100));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaViewUI className="px-5">
      <ThemedView className="mt-20">
        <ThemedText className="text-text_color_regular uppercase">Chào mừng trở lại!</ThemedText>
        <ThemedText className="text-text_color font-semibold text-[32px] mt-2 uppercase">Đăng nhập</ThemedText>
      </ThemedView>

      {/* Form */}
      <ThemedView className="mt-20">
        <ThemedInput
          label="Số điện thoại / Email"
          placeholder="Nhập số điện thoại hoặc Email"
          control={control}
          name="email"
          required
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={'relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4'}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<AntDesign name="user" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>

      <ThemedView className="mt-6">
        <ThemedInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          control={control}
          name="password"
          required
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<MaterialIcons name="lock-outline" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>

      <ThemedView className="mt-11">
        <ThemedButton
          text="Đăng Nhập"
          svgIcon={<AntDesign name="arrowright" size={24} color={COLOR_SYSTEM.white} />}
          iconPosition="right"
          className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-primary `}
          onPress={handleSubmit(handleLogin)}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default LoginScreen;
