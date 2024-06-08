import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaViewUI, SecurityIcon, ThemedButton, ThemedInput } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { useForm } from 'react-hook-form';
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { COLOR_SYSTEM } from '@/constants/Colors';
import useToastNotifications from '@/hooks/useToastNotifications';
import { forgotPasswordAPI, senOTPAPI } from '@/services/api/auth.api';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { EROUTER } from '@/constants/enum';
import { IForgotPassword } from '@/models/auth.model';

const forgotPasswordScreen = () => {
  const router = useRouter();
  const { email }: any = useLocalSearchParams();
  const showToast = useToastNotifications();
  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<IForgotPassword>({
    mode: 'onBlur',
    defaultValues: { email: '', confirmPassword: '', password: '' },
  });

  /** handle submit send OTP */
  const handleLogin = useCallback(async (values: IForgotPassword) => {
    try {
      Keyboard.dismiss();
      const res = await forgotPasswordAPI({ ...values, email: email });
      showToast(`Thay đổi mật khẩu ${res?.message}, vui lòng đăng nhập`, 'success', 'top');
      router.push({ pathname: EROUTER.LOGIN });
      // await registerTokenFCM();
    } catch (e: any) {
      showToast(`${e?.message}`, 'danger', 'top');
    } finally {
    }
  }, []);

  return (
    <SafeAreaViewUI className="px-6">
      <NavigationGoBack
        extra={
          <Link href={EROUTER.LOGIN} className="mt-2">
            <ThemedText type="link" className={'!text-primary !text-[15px] text-right !font-semibold'}>
              Đăng nhập
            </ThemedText>
          </Link>
        }
      />
      <ThemedView className="flex items-center mt-8">
        <SecurityIcon />
        <ThemedText className="text-text_color font-semibold text-[28px] mt-4 ">Đặt lại mật khẩu</ThemedText>
      </ThemedView>

      <ThemedView className="mt-6">
        <ThemedInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          control={control}
          name="password"
          isPassword
          required
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<MaterialIcons name="lock-outline" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>

      <ThemedView className="mt-6">
        <ThemedInput
          label="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
          control={control}
          name="confirmPassword"
          isPassword
          required
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<MaterialIcons name="lock-outline" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>

      {/* Form */}
      <ThemedView className={'mt-6'}>
        <ThemedView className={'mt-8'}>
          <ThemedButton
            text="Xác nhận"
            svgIcon={<AntDesign name="arrowright" size={24} color={COLOR_SYSTEM.white} />}
            iconPosition="right"
            className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-primary`}
            onPress={handleSubmit(handleLogin)}
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default forgotPasswordScreen;
