import { AppImage, SafeAreaViewUI, ThemedButton } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EPUSH_ROUTER, EROLE, ESTATUS } from '@/constants/enum';
import { BASE_URL } from '@/constants/urls';
import useLoading from '@/hooks/useLoading';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IMaintenance } from '@/models/maintenance.model';
import { getDetailMaintenanceAPI, updateStatusMaintenanceAPI } from '@/services/api/maintenance.api';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, ScrollView, Text, View } from 'react-native';

const DetailMaintenanceScreen = () => {
  const { id } = useLocalSearchParams();
  const showToast = useToastNotifications();
  const { isLoading, withLoading } = useLoading();
  const flatListRef = useRef<FlatList>(null);
  const [authUser, setAuthUser] = useState<any>(null);
  const [maintenance, setMaintenance] = useState<IMaintenance>({} as IMaintenance);

  const handleGetDetailMaintenance = async (id: string) => {
    const res = await getDetailMaintenanceAPI(id);
    setMaintenance(res?.data);
  };

  const handleUpdateStatusMaitenance = async () => {
    await withLoading(async () => {
      try {
        Keyboard.dismiss();
        if (authUser?.role?.role === EROLE.STAFF && maintenance?.status?.id === ESTATUS.PENDING) {
          const params = {
            id: id,
            statusId: ESTATUS.INPROGRESS,
          };
          await updateStatusMaintenanceAPI(params as never);
          showToast(`Cập nhật trạng thái sự cố thành công`, 'success', 'top');
          router.back();
        }
        if (authUser?.role?.role === EROLE.STAFF && maintenance?.status?.id === ESTATUS.INPROGRESS) {
          router.push({
            pathname: EPUSH_ROUTER.MAINTENACE_CREATE_SOLUTION,
            params: { id: id, title: maintenance?.title, category: maintenance?.categoryMaintenance?.id },
          });
        }
        if (authUser?.role?.role === EROLE.PRINCIPAL && maintenance?.status?.id === ESTATUS.COMPLETE) {
          const params = {
            id: id,
            role: EROLE.PRINCIPAL,
          };
          await updateStatusMaintenanceAPI(params as never);
          showToast(`Cập nhật trạng thái sự cố thành công`, 'success', 'top');
          router.back();
        }
      } catch (e: any) {
        showToast(`${e?.message}`, 'danger', 'top');
      }
    });
  };

  const renderImage = useCallback(({ item, index }: { item: any; index: number }) => {
    return (
      <View key={index}>
        <AppImage
          style={{
            borderWidth: 1,
            borderColor: COLOR_SYSTEM.textColorLight,
            marginLeft: index === 0 ? 0 : 10,
          }}
          size="medium"
          borderRadius={8}
          uri={`${BASE_URL}${item}`}
        />
      </View>
    );
  }, []);

  useEffect(() => {
    if (id) {
      handleGetDetailMaintenance(id as string);
    }
  }, [id]);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = await getAuthUser();
      setAuthUser(token);
    };
    fetchTokenAndUser();
  }, []);

  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title="Thay thế lõi lọc nước 6 tháng" titleAlight />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView className={'mt-4'}>
          <ThemedText className="text-lg font-semibold">Trường THTP Nguyễn Đức Mậu</ThemedText>
          <Text
            className={`w-[180px] mt-2 flex items-center px-2 py-2 border text-center ${
              maintenance?.status?.id === ESTATUS.PENDING
                ? 'border-error_regular'
                : maintenance?.status?.id === ESTATUS.INPROGRESS
                ? 'border-infomation_regular'
                : 'border-primary'
            }  rounded-[16px]`}
            style={{
              color:
                maintenance?.status?.id === ESTATUS.PENDING
                  ? COLOR_SYSTEM.errorRegular
                  : maintenance?.status?.id === ESTATUS.INPROGRESS
                  ? COLOR_SYSTEM.informationRegular
                  : COLOR_SYSTEM.primary,
            }}
          >
            {maintenance?.status?.name} ({maintenance?.categoryMaintenance?.name})
          </Text>
        </ThemedView>
        <ThemedView className={'mt-4'}>
          <ThemedText numberOfLines={1} className="text-lg font-medium">
            {maintenance?.title}
          </ThemedText>
          <ThemedText numberOfLines={1} className="text-base mt-1 !text-error_regular font-medium">
            Thời gian sự cố:{' '}
            {maintenance?.createdAt ? format(new Date(maintenance?.createdAt), 'dd/MM/yyyy HH:mm:ss') : 'N/A'}
          </ThemedText>
        </ThemedView>
        <ThemedView className={'mt-4'}>
          <ThemedText numberOfLines={1} className="text-base font-medium !text-text_color_regular">
            Hiện trạng:
          </ThemedText>
          <ThemedText numberOfLines={3} className="text-base mt-1 ">
            {maintenance?.reason}
          </ThemedText>
        </ThemedView>
        <ThemedView className={'mt-4'}>
          <ThemedText numberOfLines={1} className="text-base font-medium mb-2 !text-text_color_regular">
            Ảnh đính kèm
          </ThemedText>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            data={maintenance?.images_request || []}
            horizontal
            renderItem={renderImage}
            contentContainerStyle={{ paddingVertical: 0 }}
          />
        </ThemedView>
        <ThemedView className={'border border-dashed border-primary my-4'}></ThemedView>

        {/* Status Complete */}
        {(maintenance?.status?.id === ESTATUS.COMPLETE || maintenance?.status?.id === ESTATUS.COMPLETED) && (
          <>
            <ThemedView className={'flex flex-row items-center gap-4'}>
              <AppImage
                uri={`${BASE_URL}${maintenance?.staff?.avatar}`}
                style={{
                  borderWidth: 1,
                  borderColor: COLOR_SYSTEM.textColorLight,
                }}
                size="small"
                borderRadius={999}
              />
              <View>
                <ThemedText className="text-lg font-semibold">
                  Nhân viên :{' '}
                  {authUser?.role?.role === EROLE.STAFF && authUser?.id === maintenance?.staff?.id
                    ? 'Tôi'
                    : maintenance?.staff?.fullName}
                </ThemedText>
                <ThemedText className="text-base font-normal ">
                  Thời gian xử lý:{' '}
                  <ThemedText className={'!text-infomation_regular'}>
                    {true ? format(new Date(), 'dd/MM/yyyy HH:mm:ss') : 'N/A'}
                  </ThemedText>
                </ThemedText>

                {Number(maintenance?.repairFees) > 0 && (
                  <ThemedText numberOfLines={1} className="text-base  ">
                    Số tiền sửa chữa:{' '}
                    <ThemedText numberOfLines={1} className="text-base font-medium !text-error_regular ">
                      {Number(maintenance?.repairFees).toLocaleString()} VNĐ
                    </ThemedText>
                  </ThemedText>
                )}
              </View>
            </ThemedView>
            <ThemedView className={'mt-4'}>
              <ThemedText numberOfLines={1} className="text-lg font-medium !text-error_regular">
                Nguyên nhân
              </ThemedText>
              <ThemedText numberOfLines={3} className="text-base mt-1 ">
                {maintenance?.reasonRepair}
              </ThemedText>
            </ThemedView>
            <ThemedView className={'mt-4'}>
              <ThemedText numberOfLines={1} className="text-lg font-medium !text-infomation_regular">
                Phương án xử lý:
              </ThemedText>
              <ThemedText numberOfLines={3} className="text-base mt-1 ">
                {maintenance?.solution}
              </ThemedText>
            </ThemedView>
            <ThemedView className={'mt-4'}>
              <ThemedText numberOfLines={1} className="text-base font-medium mb-2 !text-text_color_regular">
                Ảnh xử lý
              </ThemedText>
              <FlatList
                showsHorizontalScrollIndicator={false}
                ref={flatListRef}
                data={maintenance?.images_response || []}
                horizontal
                renderItem={renderImage}
                contentContainerStyle={{ paddingVertical: 0 }}
              />
            </ThemedView>

            <ThemedView className={'border border-dashed border-primary my-4'}></ThemedView>
          </>
        )}
      </ScrollView>

      {(authUser?.role?.role === EROLE.STAFF && maintenance?.status?.id === ESTATUS.COMPLETE) ||
      (authUser?.role?.role === EROLE.PRINCIPAL && maintenance?.status?.id === ESTATUS.COMPLETED) ? (
        <></>
      ) : (
        <ThemedView className="mt-4">
          <ThemedButton
            disabled={
              (authUser?.role?.role === EROLE.PRINCIPAL && maintenance?.status?.id === ESTATUS.PENDING) || isLoading
            }
            text={`${
              authUser?.role?.role === EROLE.STAFF && maintenance?.status?.id === ESTATUS.PENDING
                ? 'Tiếp nhận và xử lý'
                : authUser?.role?.role === EROLE.STAFF && maintenance?.status?.id === ESTATUS.INPROGRESS
                ? 'Hoàn thành'
                : authUser?.role?.role === EROLE.PRINCIPAL && maintenance?.status?.id === ESTATUS.COMPLETE
                ? 'Xác nhận hoàn thành'
                : 'Đang chờ xử lý'
            }  `}
            iconPosition="left"
            className={`flex flex-row justify-center items-center rounded-md py-4 gap-2 ${
              authUser?.role?.role === EROLE.PRINCIPAL && maintenance?.status?.id === ESTATUS.COMPLETE
                ? 'bg-primary'
                : 'bg-infomation_regular'
            }  `}
            svgIcon={
              authUser?.role?.role === EROLE.PRINCIPAL && maintenance?.status?.id === ESTATUS.COMPLETE ? (
                <Ionicons name="shield-checkmark-outline" size={24} color={'white'} />
              ) : undefined
            }
            onPress={handleUpdateStatusMaitenance}
          />
        </ThemedView>
      )}
    </SafeAreaViewUI>
  );
};

export default DetailMaintenanceScreen;
