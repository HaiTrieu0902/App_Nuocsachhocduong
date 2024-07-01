import { AppImage, SafeAreaViewUI, ThemedButton } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { statusMessages } from '@/constants';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EPUSH_ROUTER, EROLE, ESTATUS } from '@/constants/enum';
import { BASE_URL } from '@/constants/urls';
import useLoading from '@/hooks/useLoading';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IInstallRecord } from '@/models/install.model';
import {
  deleteInstallRecordAPI,
  getDetailInstallRecordAPI,
  updateStatusInstallRecordAPI,
} from '@/services/api/install.api';
import { getButtonText } from '@/utils/helper';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
const DetailInstallRecordScreen = () => {
  const [authUser, setAuthUser] = useState<any>(null);
  const showToast = useToastNotifications();
  const { isLoading, withLoading } = useLoading();
  const { id } = useLocalSearchParams();
  const isFocused = useIsFocused();
  const [data, setData] = useState<IInstallRecord>({} as IInstallRecord);

  const StatusDisplay = ({ statusId }: any) => {
    const { title, message } = statusMessages[statusId] || statusMessages.default;
    return (
      <>
        <ThemedText className={'!text-primary text-lg font-semibold'}>{title}</ThemedText>
        <ThemedText className={'text-base'}>{message}</ThemedText>
      </>
    );
  };

  const handleUpdateStatusInstalRecord = useCallback(
    async (type: string) => {
      await withLoading(async () => {
        try {
          if (type === 'isDelete' && id) {
            const res = await deleteInstallRecordAPI(id as string);
            showToast(`Hủy yêu cầu lắp đặt ${res?.message}`, 'success', 'top');
            router.back();
            return;
          }
          if (data?.status?.id === ESTATUS.COMPLETED) {
            router.push(EPUSH_ROUTER.MAINTENACE);
            return;
          }

          if (data?.isDelete === true) {
            router.push(`${EPUSH_ROUTER.PRODUCT}/${data?.product?.id}`);
            return;
          }
          const params =
            authUser?.role?.role === EROLE.STAFF
              ? {
                  id: id as string,
                  statusId: ESTATUS.COMPLETE,
                  staffId: authUser?.id,
                }
              : {
                  id: id as string,
                  role: EROLE.PRINCIPAL || '',
                };

          const res = await updateStatusInstallRecordAPI(params);
          router.back();
          showToast(`Cập nhật trạng thái ${res?.message}`, 'success', 'top');
        } catch (error: any) {
          showToast(`${error?.message}`, 'danger', 'top');
        }
      });
    },
    [data],
  );

  useEffect(() => {
    if (id) {
      const handleGetNewsDetail = async () => {
        try {
          const res = await getDetailInstallRecordAPI(id as string);
          setData(res?.data);
        } catch (error: any) {}
      };
      handleGetNewsDetail();
    }
  }, [id, isFocused]);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = await getAuthUser();
      setAuthUser(token);
    };
    fetchTokenAndUser();
  }, []);

  return (
    <SafeAreaViewUI className="px-6">
      <NavigationGoBack title="Thông tin thiết bị lắp đặt" titleAlight />
      <ThemedView className=" py-4 border-b border-text_color_light">
        <StatusDisplay statusId={data?.status?.id} />
        <ThemedText className={'text-[14px] font-semibold mt-4'}>
          Lắp đặt và kích hoạt bảo hành:
          <ThemedText className={' !text-infomation_regular'}>
            {' '}
            {data?.timeInstall ? format(new Date(data?.timeInstall), 'dd/MM/yyyy HH:mm:ss') : 'N/A'}
          </ThemedText>
        </ThemedText>
        <ThemedText className={'text-base font-semibold mt-1'}>
          Thời hạn bảo hành:{' '}
          <ThemedText className={' !text-infomation_regular'}>
            {data?.warrantyPeriod ? data?.warrantyPeriod : 'N/A'}
          </ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView className="py-4 border-b border-text_color_light">
        <View className="flex flex-row items-center gap-3">
          <MaterialIcons name="school" size={24} color={COLOR_SYSTEM.primary} />
          <ThemedText className={'font-semibold'}>Thông tin trường học lắp đặt</ThemedText>
        </View>

        <View className="flex flex-row items-center mt-2  w-full">
          <ThemedText>Trường: </ThemedText>
          <ThemedText className={''}> {data?.school?.name ? data?.school?.name : 'N/A'}</ThemedText>
        </View>
        <View className="flex flex-row w-full">
          <ThemedText>Địa chỉ: </ThemedText>
          <ThemedText numberOfLines={2} className={' w-[88%] mt-1'}>
            {data?.school?.address ? data?.school?.address : 'N/A'}
          </ThemedText>
        </View>
        <View className="flex flex-row items-center  w-full mt-1">
          <ThemedText>Email: </ThemedText>
          <ThemedText className={''}> {data?.school?.email ? data?.school?.email : 'N/A'}</ThemedText>
        </View>
        <View className="flex flex-row items-center  w-full mt-1">
          <ThemedText>SĐT: </ThemedText>
          <ThemedText className={''}> {data?.school?.phoneNumber ? data?.school?.phoneNumber : 'N/A'}</ThemedText>
        </View>
      </ThemedView>

      <ThemedView className="py-4 border-b border-text_color_light">
        <View className="flex flex-row items-center gap-3">
          <Entypo name="water" size={24} color={COLOR_SYSTEM.primary} />
          <ThemedText className={'font-semibold'}>Thông tin thiết bị</ThemedText>
        </View>
        <View
          style={styleSheet}
          className={`flex flex-row gap-4 items-center !shadow-2xl rounded-[12px] !w-full mt-2 `}
        >
          <AppImage
            size="large"
            className={``}
            style={{ borderRadius: 10 }}
            uri={`${BASE_URL}${data?.product?.images[0] || ''}`}
          />
          <View style={{ width: '66%' }}>
            <ThemedText numberOfLines={2} className="text-text_color_regular text-base font-semibold ">
              {data?.product?.name || ''}
            </ThemedText>
            <View className="flex flex-row gap-2">
              <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
                Số lượng:
              </ThemedText>
              <ThemedText className=" text-xl font-normal " style={{ fontWeight: 500, fontSize: 14 }}>
                {data?.quantity || ''} thiết bị
              </ThemedText>
            </View>

            <View className="flex flex-row gap-2">
              <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
                Giá thiết bị:
              </ThemedText>
              <ThemedText
                className="!text-error_regular text-xl font-normal "
                style={{ fontWeight: 500, fontSize: 14 }}
              >
                {`${
                  data?.product?.price
                    ? Number(
                        data?.product?.price - (data?.product?.price * (data?.product?.discount || 0)) / 100,
                      ).toLocaleString()
                    : ''
                } `}{' '}
                VNĐ
              </ThemedText>
            </View>

            <View className="flex flex-row gap-2">
              <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
                Giá gốc:
              </ThemedText>
              <ThemedText
                className="!!text-text_color_regular text-xl font-normal "
                style={{ fontWeight: 500, fontSize: 14, textDecorationLine: 'line-through' }}
              >
                {Number(data?.product?.price).toLocaleString()} VNĐ
              </ThemedText>
            </View>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between gap-3">
          <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
            Thành tiền:
          </ThemedText>
          <ThemedText className="!text-error_regular text-xl font-normal " style={{ fontWeight: 500, fontSize: 14 }}>
            {Number(data?.totalAmount).toLocaleString()} VNĐ
          </ThemedText>
        </View>
      </ThemedView>

      <ThemedView>
        <ThemedButton
          onPress={() =>
            handleUpdateStatusInstalRecord(data?.status?.id === ESTATUS.PEDING_INSTALL ? 'isDelete' : 'update')
          }
          disabled={
            (authUser?.role?.role === EROLE.STAFF && data?.status?.id === ESTATUS.COMPLETED) ||
            (authUser?.role?.role === EROLE.STAFF && data?.status?.id === ESTATUS.COMPLETE) ||
            (authUser?.role?.role === EROLE.PRINCIPAL && data?.status?.id === ESTATUS.INPROGRESS_INSTALL)
          }
          text={getButtonText(data)}
          // svgIcon={<FontAwesome name="sign-out" size={22} color={COLOR_SYSTEM.white} />}
          iconPosition="right"
          className={`flex flex-row justify-center items-center rounded-md py-4 gap-2 ${
            data?.status?.id === ESTATUS.PEDING_INSTALL
              ? 'bg-error_regular'
              : data?.isDelete === true
              ? 'bg-infomation_regular'
              : 'bg-primary'
          } mt-10`}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default DetailInstallRecordScreen;

export const styleSheet = {
  borderRadius: 14,
  padding: 10,
  borderColor: COLOR_SYSTEM.textColorLight,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  shadowColor: COLOR_SYSTEM.black,
};
