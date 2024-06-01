import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaViewUI, ThemedInput } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useForm } from 'react-hook-form';
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { COLOR_SYSTEM } from '@/constants/Colors';
const LoginScreen = () => {
  const { control, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur',
    defaultValues: { password: '', email: '' },
  });

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
          label="Số điện thoại"
          placeholder="Nhập mật khẩu"
          control={control}
          name="email"
          required
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={'relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4'}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<MaterialIcons name="lock-outline" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default LoginScreen;
