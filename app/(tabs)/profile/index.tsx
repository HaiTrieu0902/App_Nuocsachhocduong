import { AppImage, ModalFilter, SafeAreaViewUI, ThemedButton } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROLE, EROUTER, ESTORAGE } from '@/constants/enum';
import { BASE_URL } from '@/constants/urls';
import useLoading from '@/hooks/useLoading';
import useModal from '@/hooks/useModal';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IProfileDetail } from '@/models/profile.model';
import { UploadImagesApi } from '@/services/api/common.api';
import { deleteUserAPI, getProfileUserAPI, updateImageUserAPI } from '@/services/api/profile.api';
import { asyncStorageService } from '@/utils/storage';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
  const isPrincipal = '';
  const isFocused = useIsFocused();
  const { isLoading, withLoading } = useLoading();
  const showToast = useToastNotifications();
  const [authUser, setAuthUser] = useState<any>(null);
  const [profile, setProfile] = useState<IProfileDetail>({} as IProfileDetail);
  const [image, setImage] = useState<any>(null);
  const [activeModalFilter, actionModalFilter] = useModal();
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

  const handleDisableAccount = async () => {
    if (authUser?.id) {
      try {
        await deleteUserAPI(authUser?.id);
        await asyncStorageService.removeValue(ESTORAGE.TOKEN);
        await asyncStorageService.removeValue(ESTORAGE.USER);
        showToast(`Vô hiệu hóa tài khoản thành công`, 'success', 'top');
        actionModalFilter.closeModal();
        router.push(EROUTER.LOGIN);
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    }
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
        name: 'Danh sách hồ sơ lắp đặt',
        icon: <FontAwesome name="list-alt" size={24} color={COLOR_SYSTEM.primary} />,
        routeName: EROUTER.PROFILE_LIST_ORDER,
        index: 2,
        enable: true,
      },
      {
        name: 'Thống kê - báo cáo',
        icon: <FontAwesome name="bar-chart" size={24} color={COLOR_SYSTEM.primary} />,
        routeName: EROUTER.PROFILE_LIST_MAINTENANCE,
        index: 3,
        enable: authUser?.role?.role === EROLE.STAFF ? false : true,
      },
      {
        name: 'Danh sách trường phụ trách',
        icon: <MaterialIcons name="school" size={24} color={COLOR_SYSTEM.primary} />,
        routeName: EROUTER.PROFILE_LIST_SCHOOL,
        index: 4,
        enable: authUser?.role?.role === EROLE.STAFF ? true : false,
      },
    ],
    [authUser],
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
          <ThemedText className="!text-primary text-xl font-normal mt-1 text-center">{`${
            authUser?.role?.role === EROLE.PRINCIPAL
              ? profile?.schools?.length > 0
                ? profile?.schools[0]?.name
                : 'Hiệu trưởng'
              : 'Nhân viên kỹ thuật'
          } `}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView className="mt-16 ">
        {listSetting
          ?.filter((item) => item?.enable)
          ?.map((item) => {
            return (
              <TouchableOpacity
                key={item?.index}
                onPress={() =>
                  router.push({
                    pathname: item?.routeName,
                    params: {
                      email: authUser?.email,
                      authUser: profile?.id ? JSON.stringify(profile) : JSON.stringify(authUser),
                      schools: profile?.id ? JSON.stringify(profile?.schools) : [],
                    },
                  })
                }
              >
                <ThemedView className={'flex flex-row  items-center gap-4 py-4'}>
                  {item?.icon}
                  <ThemedText className="text-base font-medium ">{item?.name}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            );
          })}
      </ThemedView>

      <ThemedButton
        onPress={actionModalFilter.toggleModal}
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
      <ModalFilter
        mode="children"
        titleHeader="Vô hiệu hóa tài khoản"
        data={[]}
        isVisible={activeModalFilter.isOpen}
        closeModal={actionModalFilter.closeModal}
        onSelected={() => {}}
      >
        <ThemedView className={'h-64'}>
          <ThemedText className={'text-center font-semibold text-2xl !text-text_color_regular'}>
            Bạn thực sự muốn vô hiệu hóa tài khoản?
          </ThemedText>
          <ThemedView className={' flex flex-row gap-2'}>
            <View className="w-[49%]">
              <ThemedButton
                onPress={actionModalFilter.closeModal}
                text="Hủy bỏ"
                iconPosition="right"
                className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-text_color_regular mt-6 `}
              />
            </View>
            <View className="w-[49%]">
              <ThemedButton
                onPress={handleDisableAccount}
                text="Đồng ý"
                iconPosition="right"
                className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-error mt-6 `}
              />
            </View>
          </ThemedView>

          <ThemedText className={'text-center font-normal text-base !text-text_color mt-3'}>
            Sau khi vô hiệu hóa bạn liên hệ với admin để có quyền truy cập lại, Mọi vấn đề thắc mắc xin liện hệ tại{' '}
            <ThemedText className={'!text-primary'}>nuocsachhocduong@gmail.com</ThemedText>
          </ThemedText>
        </ThemedView>
      </ModalFilter>
    </SafeAreaViewUI>
  );
};

export default ProfileScreen;
