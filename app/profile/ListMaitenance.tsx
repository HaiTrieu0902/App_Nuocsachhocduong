import { SafeAreaViewUI } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import ProductCard from '@/components/profile/ProductCard';
import { DEFAULT_PAGE_NUMBER, DEFAULT_SIZE_PAGE } from '@/constants';
import { EROLE, ESTATUS } from '@/constants/enum';
import useLoading from '@/hooks/useLoading';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IGetListParamInstall, IInstallRecord } from '@/models/install.model';
import { getListInstallRecordAPI } from '@/services/api/install.api';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Keyboard, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';

const ListMaintenance = () => {
  const isFocused = useIsFocused();
  const { isLoading, withLoading } = useLoading();
  const showToast = useToastNotifications();
  const [authUser, setAuthUser] = useState<any>(null);
  const [active, setActive] = useState<string>(
    authUser?.role?.role === EROLE.PRINCIPAL ? ESTATUS.PEDING_INSTALL : ESTATUS.INPROGRESS_INSTALL,
  );
  const [total, setTotal] = useState<number>(0);
  const [listInstallRecord, setListInstallRecord] = useState<IInstallRecord[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const keyExtractor = React.useCallback((_: string, index: number) => String(index), []);
  const [searchParams, setSearchParams] = useState<IGetListParamInstall>({
    pageSize: DEFAULT_SIZE_PAGE,
    page: DEFAULT_PAGE_NUMBER,
    search: '',
    statusId: authUser?.role?.role === EROLE.PRINCIPAL ? ESTATUS.PEDING_INSTALL : ESTATUS.INPROGRESS_INSTALL,
    isDelete: false,
  });

  const handleGetListProduct = async (values: IGetListParamInstall, isLoadMore = false) => {
    await withLoading(async () => {
      try {
        const res = await getListInstallRecordAPI(values);
        setTotal(res?.total);
        if (isLoadMore) {
          setListInstallRecord((prev) => [...prev, ...res?.data]);
        } else {
          setListInstallRecord(res?.data);
        }
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  const handleChangeActive = (id: string) => {
    setActive(id);

    if (id === 'isDelete') {
      setSearchParams((prev) => ({
        ...prev,
        statusId: '',
        isDelete: true,
      }));
    } else {
      setSearchParams((prev) => ({
        ...prev,
        statusId: id as string,
        isDelete: false,
      }));
    }
  };

  const handleLoadMore = () => {
    if (isLoadingMore || listInstallRecord.length >= total) return;
    const nextPage = searchParams.page + 1;
    if (nextPage > Math.ceil(total / searchParams.pageSize)) return;

    setIsLoadingMore(true);
    handleGetListProduct(
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

    setSearchParams({ ...searchParams, isDelete: active === 'isDelete' ? true : false });
    await handleGetListProduct({ ...searchParams, isDelete: active === 'isDelete' ? true : false }, false);
    setRefreshing(false);
  };

  const listStatus = React.useMemo(
    () => [
      {
        name: 'Chờ xử lý',
        id: ESTATUS.PEDING_INSTALL,
        index: 0,
        enable: true,
      },
      {
        name: 'Đang xử lý',
        id: ESTATUS.INPROGRESS_INSTALL,
        index: 1,
        enable: true,
      },
      {
        name: 'Hoàn thành',
        id: ESTATUS.COMPLETE,
        index: 2,
        enable: true,
      },
      {
        name: 'Đã hoàn thành',
        id: ESTATUS.COMPLETED,
        index: 3,
        enable: true,
      },
      {
        name: 'Đã hủy',
        id: 'isDelete',
        index: 4,
        enable: authUser?.role?.role === EROLE.PRINCIPAL ? true : false,
      },
    ],
    [authUser],
  );

  useEffect(() => {
    if (isFocused) {
      handleGetListProduct(searchParams, false);
    }
  }, [active, searchParams, isFocused]);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = await getAuthUser();
      setAuthUser(token);
      setActive(token?.role?.role === EROLE.PRINCIPAL ? ESTATUS.PEDING_INSTALL : ESTATUS.INPROGRESS_INSTALL);

      if (token?.role?.role === EROLE.PRINCIPAL) {
        setSearchParams((prev) => ({
          ...prev,
          accountId: token?.id,
          statusId: token?.role?.role === EROLE.PRINCIPAL ? ESTATUS.PEDING_INSTALL : ESTATUS.INPROGRESS_INSTALL,
        }));
      } else {
        setSearchParams((prev) => ({
          ...prev,
          staffId: token?.id,
          statusId: token?.role?.role === EROLE.PRINCIPAL ? ESTATUS.PEDING_INSTALL : ESTATUS.INPROGRESS_INSTALL,
        }));
      }
    };
    fetchTokenAndUser();
  }, []);

  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title="Danh sách sửa chữa - bảo dưỡng" titleAlight />

      <ThemedView className={'mb-2 mt-2'}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ThemedView className={'flex flex-row'}>
            {listStatus
              ?.filter((item) => item?.enable)
              ?.map((item) => {
                return (
                  <TouchableOpacity key={item?.index} onPress={() => handleChangeActive(item?.id)}>
                    <Animated.View className={`p-3 ${active === item?.id && 'border-b border-error_regular'} `}>
                      <ThemedText className={`font-medium text-base ${active === item?.id && '!text-error_regular'}`}>
                        {item?.name}
                      </ThemedText>
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
          </ThemedView>
        </ScrollView>
      </ThemedView>

      <FlashList
        data={(listInstallRecord as never) || []}
        renderItem={({ item, index }) => <ProductCard mode="orders" data={item} />}
        keyExtractor={keyExtractor}
        estimatedItemSize={120}
        //   refreshing={refreshing}
        //   onRefresh={pullToRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator /> : null}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </SafeAreaViewUI>
  );
};

export default ListMaintenance;
