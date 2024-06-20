import { AppImage, SafeAreaViewUI, ThemedButton } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROUTER, ESTORAGE } from '@/constants/enum';
import useLoading from '@/hooks/useLoading';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IProfileDetail } from '@/models/profile.model';
import { getProfileUserAPI, updateImageUserAPI } from '@/services/api/profile.api';
import { asyncStorageService } from '@/utils/storage';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { UploadImagesApi } from '@/services/api/common.api';
import { BASE_URL } from '@/constants/urls';

const ProfileScreen = () => {
  const isPrincipal = '';
  const isFocused = useIsFocused();
  const { isLoading, withLoading } = useLoading();
  const showToast = useToastNotifications();
  const [authUser, setAuthUser] = useState<any>(null);
  const [profile, setProfile] = useState<IProfileDetail>({} as IProfileDetail);
  const [image, setImage] = useState<any>(null);

  /** handle get profile  */
  const fetchProfileUser = async (id: string) => {
    await withLoading(async () => {
      try {
        const res = await getProfileUserAPI(id);
        console.log('res', res);
        setProfile(res?.data);
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  /** handle logout */
  const handleLogout = async () => {
    await asyncStorageService.removeValue(ESTORAGE.TOKEN);
    await asyncStorageService.removeValue(ESTORAGE.USER);
    showToast(`Đăng xuất thành công`, 'success', 'top');
    router.push(EROUTER.LOGIN);
  };

  /** handle pick Image */
  const handlePickImageUser = async () => {
    /** No permissions request is necessary for launching the image library */
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      // allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      const { uri, type } = result.assets[0];
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const file = {
        uri: fileInfo.uri,
        name: fileInfo.uri.split('/').pop(),
        type: type,
      };
      const files = [file];
      try {
        const response = await UploadImagesApi(files as never);
        const res = await updateImageUserAPI({
          id: authUser?.id as string,
          avatar: `common/images/${response?.data[0]?.filename}`,
        });
        setProfile(res?.data);
        showToast('Cập nhật ảnh đại điện thành công', 'success', 'top');
        // setImage(result.assets[0].uri);
      } catch (error: any) {
        showToast(error?.message, 'success', 'top');
      }
    }
  };

  /* Setup listSetting  */
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

  /** EFFECT */
  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = await getAuthUser();
      setAuthUser(token);
    };
    fetchTokenAndUser();
  }, []);

  useEffect(() => {
    if (authUser?.id && isFocused) {
      fetchProfileUser(authUser?.id as string);
    }
  }, [isFocused, authUser]);

  return (
    <SafeAreaViewUI className="px-5">
      <ThemedView className="mt-5">
        <ThemedText className="text-text_color_regular text-xl font-semibold text-center">Cá nhân</ThemedText>
        <ThemedView className={'items-center'}>
          <TouchableOpacity onPress={handlePickImageUser}>
            <AppImage
              style={{ marginTop: 14, borderWidth: 1, borderColor: COLOR_SYSTEM.textColorLight }}
              size="medium"
              borderRadius={999}
              uri={`${BASE_URL}${profile?.avatar}`}
            />
          </TouchableOpacity>

          <ThemedText className="text-text_color_regular text-2xl mt-2 font-bold text-center">
            {profile?.fullName ? profile?.fullName : authUser?.fullName}
          </ThemedText>
          <ThemedText className="!text-primary text-xl font-normal mt-1 text-center">{'Nhân viên kỹ thuật'}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView className="mt-16 ">
        {listSetting?.map((item) => {
          return (
            <TouchableOpacity
              key={item?.index}
              onPress={() =>
                router.push({
                  pathname: item?.routeName,
                  params: {
                    email: authUser?.email,
                    authUser: profile?.id ? JSON.stringify(profile) : JSON.stringify(authUser),
                  },
                })
              }
            >
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
        onPress={handleLogout}
        text="Đăng Xuất"
        svgIcon={<FontAwesome name="sign-out" size={22} color={COLOR_SYSTEM.white} />}
        iconPosition="right"
        className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-primary mt-6`}
      />
    </SafeAreaViewUI>
  );
};

export default ProfileScreen;
