import { AppCard, AppImage } from '@/components';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DEFAULT_PAGE_NUMBER, DEFAULT_SIZE_PAGE } from '@/constants';
import useLoading from '@/hooks/useLoading';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IGetListParamCommon } from '@/models/common.model';
import { INews } from '@/models/news.model';
import { getListNewsAPI } from '@/services/api/news.api';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';

const HomeScreen = () => {
  const showToast = useToastNotifications();
  const isFocused = useIsFocused();
  const { isLoading, withLoading } = useLoading();
  const [listNews, setListNews] = useState<INews[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<IGetListParamCommon>({
    pageSize: DEFAULT_SIZE_PAGE,
    page: DEFAULT_PAGE_NUMBER,
    search: '',
  });
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const keyExtractor = React.useCallback((_: any, index: number) => String(index), []);

  const handleGetListNews = async (values: IGetListParamCommon, isLoadMore = false) => {
    await withLoading(async () => {
      try {
        const res = await getListNewsAPI(values);
        setTotal(res?.total);
        if (isLoadMore) {
          setListNews((prev) => [...prev, ...res?.data]);
        } else {
          setListNews(res?.data);
        }
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  const renderItemPost = useCallback(({ item }: { item: INews }) => {
    return <AppCard key={item?.id} mode="news" data={item} />;
  }, []);

  const handleLoadMore = () => {
    if (isLoadingMore || listNews.length >= total) return;
    const nextPage = searchParams.page + 1;
    if (nextPage > Math.ceil(total / searchParams.pageSize)) return;
    setIsLoadingMore(true);
    handleGetListNews(
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
    setRefreshing(true);
    const resetParams = {
      pageSize: DEFAULT_SIZE_PAGE,
      page: DEFAULT_PAGE_NUMBER,
      search: '',
    };
    setSearchParams(resetParams);
    await handleGetListNews(resetParams, false);
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      handleGetListNews(searchParams, false);
    }
  }, [isFocused]);

  return (
    <React.Fragment>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <AppImage
            size="background"
            uri={
              'https://nuocsachhocduong.com/wp-content/uploads/2022/03/z3232669649183_e4abece3a56919bb5c748edd18f2cd16.jpg'
            }
          />
        }
      >
        <ThemedView>
          <ThemedText className="text-text_color_regular text-xl font-semibold ">
            Giới thiệu dự án nước sạch học đường
          </ThemedText>
          <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
            Dự án Nước Sạch Học Đường Việt Nam là chuỗi các hoạt động nhằm góp phần vào việc bảo vệ và nâng cao sức khoẻ
            của học sinh, sinh viên, cán bộ và giáo viên tại các trường ...
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
      <ThemedView style={{ flex: 1 }} className={'-mt-20 px-6 pb-4'}>
        <FlashList
          data={listNews}
          renderItem={renderItemPost}
          keyExtractor={keyExtractor}
          estimatedItemSize={120}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={isLoadingMore ? <ActivityIndicator /> : null}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      </ThemedView>
    </React.Fragment>
  );
};

export default HomeScreen;
