import { AppImage, SafeAreaViewUI, ThemedButton } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROUTER } from '@/constants/enum';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  const isPrincipal = '';

  const listSetting = React.useMemo(
    () => [
      {
        name: 'Thông tin người dùng',
        icon: <AntDesign name="user" size={24} color={COLOR_SYSTEM.primary} />,
        routeName: EROUTER.PROFILE_INFOMATION,
        index: 0,
        enable: true,
      },
      {
        name: 'Thay đổi mật khẩu',
        icon: <MaterialIcons name="lock-outline" size={24} color={COLOR_SYSTEM.primary} />,
        routeName: EROUTER.PROFILE_CHANGE_PASS,
        index: 1,
        enable: true,
      },
      {
        name: 'Danh sách sản phẩm đã lắp đặt',
        icon: <FontAwesome name="list-alt" size={24} color={COLOR_SYSTEM.primary} />,
        routeName: EROUTER.PROFILE_LIST_ORDER,
        index: 2,
        enable: isPrincipal,
      },
      {
        name: 'Danh sách trường phụ trách',
        icon: <MaterialIcons name="school" size={24} color={COLOR_SYSTEM.primary} />,
        routeName: EROUTER.PROFILE_LIST_SCHOOL,
        index: 3,
        enable: isPrincipal,
      },
    ],
    [isPrincipal],
  );

  return (
    <SafeAreaViewUI className="px-5">
      <ThemedView className="mt-5">
        <ThemedText className="text-text_color_regular text-xl font-semibold text-center">Cá nhân</ThemedText>
        <ThemedView className={'items-center'}>
          <AppImage
            className={'w-28 h-28 bg-primary rounded-full mt-4 object-contain'}
            uri={'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/09/gojo-satoru-1.jpg'}
          />

          <ThemedText className="text-text_color_regular text-2xl mt-2 font-bold text-center">Hai Trieu</ThemedText>
          <ThemedText className="!text-primary text-xl font-normal mt-1 text-center">Trường THPT Đại Nghĩa</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView className="mt-16 ">
        {listSetting?.map((item) => {
          return (
            <TouchableOpacity onPress={() => router.push(item?.routeName)}>
              <ThemedView className={'flex flex-row  items-center gap-4 py-4'}>
                {item?.icon}
                <ThemedText className="text-[16px] font-normal ">{item?.name}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          );
        })}
      </ThemedView>

      <ThemedButton
        text="Vô hiệu hóa tài khoản"
        svgIcon={<FontAwesome name="ban" size={20} color={COLOR_SYSTEM.white} />}
        iconPosition="right"
        className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-error_regular mt-10`}
      />
      <ThemedButton
        text="Đăng Xuất"
        svgIcon={<FontAwesome name="sign-out" size={22} color={COLOR_SYSTEM.white} />}
        iconPosition="right"
        className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-primary mt-6`}
      />
    </SafeAreaViewUI>
  );
};

export default ProfileScreen;
