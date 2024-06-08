import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { useForm } from 'react-hook-form';
import { AntDesign, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { COLOR_SYSTEM } from '@/constants/Colors';
import useToastNotifications from '@/hooks/useToastNotifications';
import { senOTPAPI } from '@/services/api/auth.api';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { EROUTER } from '@/constants/enum';

const VerifyOTPScreen = () => {
  const router = useRouter();
  const { email }: any = useLocalSearchParams();
  const showToast = useToastNotifications();
  console.log('📢 [verifyOTP.tsx:21] email', email);

  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur',
    defaultValues: { otp: '' },
  });

  /** handle submit send OTP */
  const handleVerify = useCallback(async (values: { otp: string }) => {
    try {
      Keyboard.dismiss();
      // const res = await senOTPAPI(values);
      // showToast(`Gửi mã OTP ${res?.message}, vui lòng kiểm tra email`, 'success', 'top');
      router.push(EROUTER.RESETPASSWORD);
      // await registerTokenFCM();
    } catch (e: any) {
      showToast(`${e?.message}`, 'danger', 'top');
    } finally {
    }
  }, []);

  /** handle send agian OTP */
  const handleSendOtpAgain = () => {
    if (email) {
      console.log('📢 [verifyOTP.tsx:43] email', email);
    }
  };

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
        <ThemedText className="text-text_color font-semibold text-[28px] mt-2 ">Mã xác nhận</ThemedText>
      </ThemedView>

      <ThemedView className="mt-2">
        <ThemedText className="!text-text_color_regular font-semibold text-[15px] mt-2 leading-6">
          Chúng tôi đã gửi mã xác nhận đặt lại mật khẩu đến địa chỉ Email của bạn. Vui lòng nhập mã xác nhận để tiếp tục
          đến bước
          <ThemedText> Đặt lại mật khẩu.</ThemedText>
        </ThemedText>
      </ThemedView>

      {/* Form */}
      <ThemedView className={'mt-6'}>
        <ThemedInput
          label="Mã xác nhận"
          placeholder="Nhập mã xác nhận"
          control={control}
          name="otp"
          required
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<FontAwesome5 name="keyboard" size={24} color={COLOR_SYSTEM.primary} />}
        />

        <ThemedView className={'mt-4 items-end'}>
          <ThemedButton
            text="Gửi lại"
            iconPosition="right"
            className={`flex flex-row justify-center  items-center rounded-md w-40 py-2 gap-2 bg-infomation_regular`}
            onPress={handleSendOtpAgain}
          />
        </ThemedView>

        <ThemedView className={'mt-8'}>
          <ThemedButton
            text="Đặt Lại Mật Khẩu"
            svgIcon={<AntDesign name="arrowright" size={24} color={COLOR_SYSTEM.white} />}
            iconPosition="right"
            className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-primary`}
            onPress={handleSubmit(handleVerify)}
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({});
