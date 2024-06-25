import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  Button,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { AppImage, ModalFilter, NotFoundItemIcon, SafeAreaViewUI, ThemedInput } from '@/components';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from '@/components/HelloWave';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import useToastNotifications from '@/hooks/useToastNotifications';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import useModal from '@/hooks/useModal';
import { DATA_FILTER_MAINTENANCE, DEFAULT_PAGE_NUMBER, DEFAULT_SIZE_PAGE } from '@/constants';
import { IGetListParamMaintenance, IMaintenance } from '@/models/maintenance.model';
import { useIsFocused } from '@react-navigation/native';
import useLoading from '@/hooks/useLoading';
import { getListMaintenanceAPI } from '@/services/api/maintenance.api';
import { FlashList } from '@shopify/flash-list';
import { format } from 'date-fns';
import { ESTATUS } from '@/constants/enum';

const MaintainanceScreen = () => {
  const showToast = useToastNotifications();
  const color = useThemeColor({}, 'text');
  const isFocused = useIsFocused();
  const { isLoading, withLoading } = useLoading();
  const [listMaintenance, setListMaintenance] = useState<IMaintenance[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<IGetListParamMaintenance>({
    pageSize: DEFAULT_SIZE_PAGE,
    page: DEFAULT_PAGE_NUMBER,
    search: '',
    isDelete: false,
  });
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeModalFilter, actionModalFilter] = useModal();
  const keyExtractor = React.useCallback((_: any, index: number) => String(index), []);

  const handleSearch = useCallback(async (values: any) => {
    try {
      Keyboard.dismiss();
      handleGetListMaintenance({ ...searchParams, page: DEFAULT_PAGE_NUMBER, search: values?.search }, false);
    } catch (e: any) {
      showToast(`${e?.message}`, 'danger', 'top');
    } finally {
    }
  }, []);

  const handleChangeFilter = (value: string | number) => {
    actionModalFilter.closeModal();
    handleGetListMaintenance({ ...searchParams, page: DEFAULT_PAGE_NUMBER, statusId: value as string }, false);
    setSearchParams((prev) => ({
      ...prev,
      statusId: value as string,
    }));
  };

  const handleGetListMaintenance = async (values: IGetListParamMaintenance, isLoadMore = false) => {
    await withLoading(async () => {
      try {
        const res = await getListMaintenanceAPI(values);
        setTotal(res?.total);
        if (isLoadMore) {
          setListMaintenance((prev) => [...prev, ...res?.data]);
        } else {
          setListMaintenance(res?.data);
        }
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  const handleLoadMore = () => {
    if (isLoadingMore || listMaintenance.length >= total) return;
    const nextPage = searchParams.page + 1;
    if (nextPage > Math.ceil(total / searchParams.pageSize)) return;
    setIsLoadingMore(true);
    handleGetListMaintenance(
      {
        ...searchParams,
        page: nextPage,
      },
      true,
    ).finally(() => {
      setSearchParams((prev) => ({
        ...prev,
        page: nextPage,
      }));
      setIsLoadingMore(false);
    });
  };

  const handleRefresh = async () => {
    Keyboard.dismiss();
    setRefreshing(true);
    const resetParams = {
      pageSize: DEFAULT_SIZE_PAGE,
      page: DEFAULT_PAGE_NUMBER,
      search: '',
    };
    setSearchParams(resetParams);
    await handleGetListMaintenance(resetParams, false);
    setRefreshing(false);
  };

  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur',
    defaultValues: { password: '', email: '' },
  });

  const styleSheet = {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    shadowColor: color,
  };

  useEffect(() => {
    if (isFocused) {
      handleGetListMaintenance(searchParams, false);
    }
  }, []);

  const renderItemPost = useCallback(({ item, index }: { item: IMaintenance; index: number }) => {
    return (
      <TouchableOpacity key={index}>
        <ThemedView
          className="rounded-xl p-4 border-l-[8px] border !border-text_color_light mt-4"
          style={[
            styleSheet,
            {
              borderLeftColor:
                item?.status.id === ESTATUS.PENDING
                  ? COLOR_SYSTEM.errorRegular
                  : item?.status.id === ESTATUS.INPROGRESS
                  ? COLOR_SYSTEM.informationRegular
                  : COLOR_SYSTEM.primary,
            },
          ]}
        >
          <View className="flex flex-row items-center gap-2">
            <AppImage uri={''} size="small" className={''} />
            <View>
              <ThemedText className="text-lg font-semibold">{item.school.name}</ThemedText>
              <ThemedText className="text-sm font-light">{item.account.fullName}</ThemedText>
            </View>
          </View>
          <ThemedView className="border-t border-b border-text_color_light py-3 mt-2">
            <ThemedText className="text-[16px] ">{item.title}</ThemedText>
          </ThemedView>
          <ThemedText className="mt-3 text-base">Hiện trạng:</ThemedText>
          <ThemedText numberOfLines={2} className="!text-text_color_regular text-base mt-1">
            {item?.reason}
          </ThemedText>
          <View className="border-t border-text_color_light py-3 mt-4 flex flex-row items-center justify-between">
            <ThemedText className=" ">
              Thời gian sự cố:{' '}
              <ThemedText className={'!text-text_color_regular text-sm'}>
                {item?.createdAt ? format(new Date(item?.createdAt), 'dd/MM/yyyy HH:mm:ss') : 'N/A'}
              </ThemedText>
            </ThemedText>
            <Text
              className={`text-right px-2 py-2 border  ${
                item?.status.id === ESTATUS.PENDING
                  ? 'border-error_regular'
                  : item?.status.id === ESTATUS.INPROGRESS
                  ? 'border-infomation_regular'
                  : 'border-primary'
              }  rounded-[16px]`}
              style={{
                color:
                  item?.status.id === ESTATUS.PENDING
                    ? COLOR_SYSTEM.errorRegular
                    : item?.status.id === ESTATUS.INPROGRESS
                    ? COLOR_SYSTEM.informationRegular
                    : COLOR_SYSTEM.primary,
              }}
            >
              {item?.status.name}
            </Text>
          </View>
        </ThemedView>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaViewUI className="px-5 flex-1">
      <ThemedView className={'flex flex-row justify-between items-center gap-4'}>
        <ThemedView className={'flex-1'}>
          <ThemedInput
            notCheck
            placeholder="Tìm kiếm sửa chữa - bảo dưỡng"
            control={control}
            name="search"
            required
            iconDisplay="right"
            maxLength={255}
            className={'relative mt-3 '}
            classNameStyleInput={'relative border border-text_color_regular bg-white rounded-md pl-4 pr-4 py-3 '}
            classNameStyleLabel={'text-lg text-text_color'}
            icon={
              <TouchableOpacity onPress={handleSubmit(handleSearch)}>
                <Octicons name="search" className="-mt-1" size={24} color={COLOR_SYSTEM.primary} />
              </TouchableOpacity>
            }
          />
        </ThemedView>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <TouchableOpacity>
            <AntDesign
              name="filter"
              onPress={actionModalFilter.toggleModal}
              className="mt-3"
              size={26}
              color={COLOR_SYSTEM.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="plus" className="mt-3" size={26} color={COLOR_SYSTEM.primary} />
          </TouchableOpacity>
        </View>
      </ThemedView>

      <ThemedView className="mt-2 flex-1">
        {listMaintenance?.length > 0 ? (
          <FlashList
            data={listMaintenance}
            renderItem={renderItemPost}
            keyExtractor={keyExtractor}
            estimatedItemSize={120}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={isLoadingMore ? <ActivityIndicator /> : null}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          />
        ) : (
          <ThemedView className={'flex items-center'}>
            <NotFoundItemIcon />
            <ThemedText className={'text-lg'}>Hiện tại không có sửa chữa - bảo dưỡng </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ModalFilter
        mode="filter"
        isRefresh={refreshing}
        titleHeader="Lọc nâng cao"
        data={DATA_FILTER_MAINTENANCE}
        isVisible={activeModalFilter.isOpen}
        closeModal={actionModalFilter.closeModal}
        onSelected={handleChangeFilter}
      />
    </SafeAreaViewUI>
  );
};

export default MaintainanceScreen;
