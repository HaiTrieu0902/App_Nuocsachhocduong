import { SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROUTER } from '@/constants/enum';
import { IChangePassword, IInforUser } from '@/models/profile.model';
import { AntDesign, Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';

const ChangePasswordScreen = () => {
  const router = useRouter();

  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<IChangePassword>({
    mode: 'onBlur',
    defaultValues: {},
  });

  const handleChangePassword = (values: IChangePassword) => {
    console.log('values', values);
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
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          control={control}
          name="confirmPassword"
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
