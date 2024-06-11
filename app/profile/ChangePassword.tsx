import { SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { COLOR_SYSTEM } from '@/constants/Colors';
import useLoading from '@/hooks/useLoading';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IChangePassword } from '@/models/profile.model';
import { changePasswordAPI } from '@/services/api/profile.api';
import { ValidationError, ValidationSchema } from '@/utils/validation';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';

const ChangePasswordScreen = () => {
  const { isLoading, withLoading } = useLoading();
  const { email } = useLocalSearchParams();
  const showToast = useToastNotifications();
  /** SET UP form  */
  const { control, handleSubmit, reset, watch } = useForm<IChangePassword>({
    mode: 'onBlur',
    defaultValues: {},
  });

  const handleChangePassword = async (values: IChangePassword) => {
    await withLoading(async () => {
      try {
        const res = await changePasswordAPI({
          oldPassword: values?.oldPassword,
          newPassword: values?.newPassword,
          email: email as string,
        });
        showToast(`Thay đổi mật khẩu ${res?.message}`, 'success', 'top');
        router.back();
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  return (
    <SafeAreaViewUI className="px-6">
      <NavigationGoBack title="Thay đổi mật khẩu" titleAlight />
      <ThemedView className="mt-10">
        <ThemedInput
          label="Mật khẩu cũ"
          placeholder="Nhập mật khẩu cũ"
          control={control}
          name="oldPassword"
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
      </ThemedView>
      <ThemedView className="mt-5">
        <ThemedInput
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          control={control}
          name="newPassword"
          isPassword
          required
          maxLength={255}
          rules={{
            validate: (value: string) => {
              if (value.length < 8) {
                return ValidationError.password.min;
              }
              if (value.length > 255) {
                return ValidationError.password.max;
              } else if (!value.match(ValidationSchema.password)) {
                return ValidationError.password.pattern;
              }
            },
          }}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<MaterialIcons name="lock-outline" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>

      <ThemedView className="mt-5">
        <ThemedInput
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          control={control}
          name="confirmPassword"
          isPassword
          required
          maxLength={255}
          rules={{
            validate: (value: string) => {
              if (value?.length < 8) {
                return ValidationError.password.min;
              }
              if (value?.length > 255) {
                return ValidationError.password.max;
              } else if (!value?.match(ValidationSchema.password)) {
                return ValidationError.password.pattern;
              } else if (watch('newPassword') !== value) {
                return ValidationError.password.match;
              }
            },
          }}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
          icon={<MaterialIcons name="lock-outline" size={24} color={COLOR_SYSTEM.primary} />}
        />
      </ThemedView>

      <ThemedView className="mt-11">
        <ThemedButton
          text="Cập nhật"
          iconPosition="right"
          className={`flex flex-row justify-center items-center rounded-md py-4 gap-2 bg-primary `}
          onPress={handleSubmit(handleChangePassword)}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default ChangePasswordScreen;
