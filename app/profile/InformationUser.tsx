import { SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROUTER } from '@/constants/enum';
import { IInforUser } from '@/models/profile.model';
import { AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';

const InformationUserScreen = () => {
  const router = useRouter();

  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<IInforUser>({
    mode: 'onBlur',
    defaultValues: { fullName: '', email: '', sdt: '' },
  });

  const handleUpdateInfomation = (values: IInforUser) => {
    console.log('values', values);
  };

  return (
    <SafeAreaViewUI className="px-6">
      <NavigationGoBack title="Thông tin người dùng" titleAlight />
      <ThemedView className="mt-10">
        <ThemedInput
          label="Họ và tên"
          placeholder="Nhập họ và tên của bạn"
          control={control}
          name="fullname"
          required
          maxLength={255}
          className={'relative mt-2 '}
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
          name="sdt"
          required
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
