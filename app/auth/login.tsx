import { SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROUTER } from '@/constants/enum';
import useToastNotifications from '@/hooks/useToastNotifications';
import { ILoginParams } from '@/models/auth.model';
import { loginAPI } from '@/services/api/auth.api';
import { ValidationError, ValidationSchema } from '@/utils/validation';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
const LoginScreen = () => {
  const router = useRouter();
  const showToast = useToastNotifications();

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
      showToast(`Đăng nhập ${res?.message}`, 'success', 'top');
      router.push('feed/new');
      // await registerTokenFCM();
    } catch (e: any) {
      showToast(`${e?.message}`, 'danger', 'top');
    } finally {
    }
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
          isPassword
          required
          maxLength={255}
          // rules={{
          //   validate: (value: string) => {
          //     if (value.length < 8) {
          //       return ValidationError.password.min;
          //     }
          //     if (value.length > 255) {
          //       return ValidationError.password.max;
          //     } else if (!value.match(ValidationSchema.password)) {
          //       return ValidationError.password.pattern;
          //     }
          //   },
          // }}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<MaterialIcons name="lock-outline" size={24} color={COLOR_SYSTEM.primary} />}
        />

        <Link href={EROUTER.FORGOTPASSWORD} className="mt-2">
          <ThemedText type="link" className={'!text-primary !text-[15px] text-right '}>
            Quên mật khẩu?
          </ThemedText>
        </Link>
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
