import { NotFoundItemIcon, SafeAreaViewUI } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DEFAULT_PAGE_NUMBER, DEFAULT_SIZE_PAGE } from '@/constants';
import { COLOR_SYSTEM } from '@/constants/Colors';
import useLoading from '@/hooks/useLoading';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IGetListParamNotification, INotification } from '@/models/notification.model';
import { getListNotificationAPI } from '@/services/api/notification.api';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, RefreshControl } from 'react-native';

const NotificationScreen = () => {
  const showToast = useToastNotifications();
  const isFocused = useIsFocused();
  const [listNotification, setListNotification] = useState<INotification[]>([]);
  const { isLoading, withLoading } = useLoading();
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const keyExtractor = React.useCallback((_: any, index: number) => String(index), []);
  const [total, setTotal] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<IGetListParamNotification>({
    pageSize: 14,
    page: DEFAULT_PAGE_NUMBER,
    search: '',
  });

  const handleGetListNotification = async (values: IGetListParamNotification, isLoadMore = false) => {
    await withLoading(async () => {
      try {
        const res = await getListNotificationAPI(values);
        setTotal(res?.total);
        if (isLoadMore) {
          setListNotification((prev) => [...prev, ...res?.data]);
        } else {
          setListNotification(res?.data);
        }
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  const handleLoadMore = () => {
    if (isLoadingMore || listNotification.length >= total) return;
    const nextPage = searchParams.page + 1;
    if (nextPage > Math.ceil(total / searchParams.pageSize)) return;
    setIsLoadingMore(true);
    handleGetListNotification(
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

  const renderItemPost = useCallback(({ item }: { item: INotification }) => {
    return (
      <ThemedView key={item?.id} className={'mt-4 flex flex-row gap-3'}>
        <ThemedView className={'h-14 w-14 rounded-full !bg-primary flex items-center justify-center'}>
          {item?.isRead === false ? (
            <>
              <MaterialCommunityIcons name="bell-ring-outline" size={24} color={COLOR_SYSTEM.errorRegular} />
            </>
          ) : (
            <>
              <Feather name="bell" size={24} color="white" />
            </>
          )}
        </ThemedView>

        <ThemedView className={'flex flex-row gap-3 w-[80%]'}>
          <ThemedView>
            <ThemedText numberOfLines={2} className={'font-semibold'}>
              {item?.data?.title}
            </ThemedText>
            <ThemedText className={'mt-1'}>
              {item?.isRead === false ? 'Tin nhắn chưa đọc' : 'Tin nhắn đã đọc'}{' '}
              <ThemedText className={'!text-text_color_regular'}>
                {'- '}
                {item?.data?.time ? format(new Date(item?.data?.time), 'dd/MM/yyyy HH:mm:ss') : 'N/A'}
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  }, []);

  const handleRefresh = async () => {
    Keyboard.dismiss();
    setRefreshing(true);
    const resetParams = {
      ...searchParams,
      pageSize: 14,
      page: DEFAULT_PAGE_NUMBER,
    };

    setSearchParams(resetParams);
    await handleGetListNotification(resetParams, false);
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused && searchParams?.receiverId) {
      handleGetListNotification(searchParams, false);
    }
  }, [isFocused, searchParams]);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = await getAuthUser();
      setSearchParams((prev) => ({
        ...prev,
        receiverId: token?.id,
      }));
    };

    fetchTokenAndUser();
  }, []);

  console.log('searchParams', searchParams);

  return (
    <SafeAreaViewUI className="px-6">
      <ThemedView>
        <ThemedText className="text-text_color font-semibold text-[32px] mt-3 uppercase text-center">
          Thông báo
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ flex: 1 }} className={''}>
        {listNotification?.length > 0 ? (
          <FlashList
            data={listNotification || []}
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
            <ThemedText className={'text-lg'}>Hiện tại chưa có thông báo nào </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default NotificationScreen;
