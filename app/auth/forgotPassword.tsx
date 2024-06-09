import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { useForm } from 'react-hook-form';
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { COLOR_SYSTEM } from '@/constants/Colors';
import useToastNotifications from '@/hooks/useToastNotifications';
import { senOTPAPI } from '@/services/api/auth.api';
import { Link, useRouter } from 'expo-router';
import { EROUTER } from '@/constants/enum';
import { ValidationError, ValidationSchema } from '@/utils/validation';

const forgotPasswordScreen = () => {
  const router = useRouter();

  const showToast = useToastNotifications();
  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur',
    defaultValues: { email: '' },
  });

  /** handle submit send OTP */
  const handleLogin = useCallback(async (values: { email: string }) => {
    try {
      Keyboard.dismiss();
      const res = await senOTPAPI(values);
      showToast(`Gửi mã OTP ${res?.message}, vui lòng kiểm tra email`, 'success', 'top');
      router.push({ pathname: EROUTER.VERIFYOTP, params: { email: values?.email as never } });
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
      <ThemedView className="mt-4">
        <ThemedText className="text-text_color font-semibold text-[28px] mt-2 ">Quên mật khẩu</ThemedText>
      </ThemedView>

      <ThemedView className="mt-2">
        <ThemedText className="!text-text_color_regular font-semibold text-[15px] mt-2 leading-6">
          Đừng lo lắng, chúng tôi có cách để đặt lại mật khẩu của bạn. Nhập địa chỉ email của bạn vào trường sau và nhấp
          vào
          <ThemedText> Gửi yêu cầu.</ThemedText>
        </ThemedText>
      </ThemedView>

      {/* Form */}
      <ThemedView className={'mt-6'}>
        <ThemedInput
          label="Email"
          placeholder="Nhập địa chỉ Email"
          control={control}
          name="email"
          required
          rules={{
            pattern: {
              value: ValidationSchema.email,
              message: ValidationError.email,
            },
          }}
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<Fontisto name="email" size={24} color={COLOR_SYSTEM.primary} />}
        />
        <ThemedView className={'mt-8'}>
          <ThemedButton
            text="Gửi yêu cầu"
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
