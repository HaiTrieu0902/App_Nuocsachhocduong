import { SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { COLOR_SYSTEM } from '@/constants/Colors';
import useLoading from '@/hooks/useLoading';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IInforUser, IProfileDetail } from '@/models/profile.model';
import { updateProfileUserAPI } from '@/services/api/profile.api';
import { ValidationError, ValidationSchema } from '@/utils/validation';
import { AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';

const InformationUserScreen = () => {
  const { isLoading, withLoading } = useLoading();
  const { authUser }: any = useLocalSearchParams();
  const showToast = useToastNotifications();
  const parsedAuthUser = JSON.parse(authUser);

  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<IInforUser>({
    mode: 'onBlur',
    defaultValues: {
      fullName: parsedAuthUser?.fullName,
      phoneNumber: parsedAuthUser?.phoneNumber,
      email: parsedAuthUser?.email,
    },
  });

  const handleUpdateInfomation = async (values: IInforUser) => {
    await withLoading(async () => {
      try {
        const res = await updateProfileUserAPI({ ...values, id: parsedAuthUser?.id });
        showToast(`Cập nhật thông tin ${res?.message}`, 'success', 'top');
        router.back();
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  return (
    <SafeAreaViewUI className="px-6">
      <NavigationGoBack title="Thông tin người dùng" titleAlight />
      <ThemedView className="mt-10">
        <ThemedInput
          label="Họ và tên"
          placeholder="Nhập họ và tên của bạn"
          control={control}
          name="fullName"
          required
          maxLength={255}
          className={'relative mt-2 '}
          rules={{
            validate: (v: string) => {
              if (v?.trim()?.length > 255) {
                return ValidationError.fullName;
              }
            },
          }}
          classNameStyleInput={'relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4'}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<AntDesign name="user" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>
      <ThemedView className="mt-5">
        <ThemedInput
          label="Số điện thọai"
          placeholder="Nhập số điện thoại của bạn"
          control={control}
          name="phoneNumber"
          required
          rules={{
            validate: (v: string) => {
              if (v?.trim().length > 0 && !ValidationSchema.phoneNumber.test(v)) {
                return ValidationError.phoneNumber;
              }
              return true;
            },
          }}
          maxLength={255}
          className={'relative mt-2 '}
          classNameStyleInput={'relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4'}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<Feather name="phone" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>

      <ThemedView className="mt-5">
        <ThemedInput
          label="Email"
          placeholder="Nhập email của bạn"
          control={control}
          name="email"
          required
          maxLength={255}
          rules={{
            validate: (v: string) => {
              if (v?.trim().length > 0) {
                if (!ValidationSchema.email.test(v) || ValidationSchema.checkWhitespace.test(v)) {
                  return ValidationError.email;
                }
              }
            },
          }}
          className={'relative mt-2 '}
          classNameStyleInput={'relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4'}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<Fontisto name="email" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>

      <ThemedView className="mt-11">
        <ThemedButton
          text="Cập nhật"
          iconPosition="right"
          className={`flex flex-row justify-center items-center rounded-md py-4 gap-2 bg-primary `}
          onPress={handleSubmit(handleUpdateInfomation)}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default InformationUserScreen;
