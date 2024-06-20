import { AppCard, ModalFilter, NotFoundItemIcon, SafeAreaViewUI, ThemedInput } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DATA_FILTER_PRODUCT, DEFAULT_PAGE_NUMBER, DEFAULT_SIZE_PAGE } from '@/constants';
import { COLOR_SYSTEM } from '@/constants/Colors';
import useLoading from '@/hooks/useLoading';
import useModal from '@/hooks/useModal';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IGetListParamProduct, IProduct } from '@/models/product.model';
import { getListProductAPI } from '@/services/api/product.api';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Keyboard, RefreshControl, TouchableOpacity, View } from 'react-native';

const ProductScreen = () => {
  const showToast = useToastNotifications();
  const isFocused = useIsFocused();
  const { isLoading, withLoading } = useLoading();
  const [listProduct, setListProduct] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<IGetListParamProduct>({
    pageSize: DEFAULT_SIZE_PAGE,
    page: DEFAULT_PAGE_NUMBER,
    search: '',
    isDelete: false,
  });
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeModalFilter, actionModalFilter] = useModal();

  const handleChangeFilter = (value: string | number) => {
    actionModalFilter.closeModal();
    handleGetListProduct({ ...searchParams, page: DEFAULT_PAGE_NUMBER, categoryProductId: value as string }, false);
    setSearchParams((prev) => ({
      ...prev,
      categoryProductId: value as string,
    }));
  };

  const keyExtractor = React.useCallback((_: any, index: number) => String(index), []);

  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur',
    defaultValues: { password: '', email: '' },
  });

  const handleGetListProduct = async (values: IGetListParamProduct, isLoadMore = false) => {
    await withLoading(async () => {
      try {
        const res = await getListProductAPI(values);
        setTotal(res?.total);
        if (isLoadMore) {
          setListProduct((prev) => [...prev, ...res?.data]);
        } else {
          setListProduct(res?.data);
        }
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  const renderItemPost = useCallback(({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          paddingRight: index % 2 === 0 ? 8 : undefined,
          paddingLeft: index % 2 !== 0 ? 8 : undefined,
        }}
      >
        <AppCard key={item?.id} mode="product" data={item} />
      </View>
    );
  }, []);

  const handleLoadMore = () => {
    if (isLoadingMore || listProduct.length >= total) return;
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
    const resetParams = {
      pageSize: DEFAULT_SIZE_PAGE,
      page: DEFAULT_PAGE_NUMBER,
      search: '',
    };
    setSearchParams(resetParams);
    await handleGetListProduct(resetParams, false);
    setRefreshing(false);
  };

  const handleSearch = useCallback(async (values: any) => {
    try {
      Keyboard.dismiss();
      handleGetListProduct({ ...searchParams, page: DEFAULT_PAGE_NUMBER, search: values?.search }, false);
    } catch (e: any) {
      showToast(`${e?.message}`, 'danger', 'top');
    } finally {
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      handleGetListProduct(searchParams, false);
    }
  }, []);

  return (
    <React.Fragment>
      <SafeAreaViewUI className="px-5 flex-1">
        <ThemedView className={'flex flex-row justify-between items-center gap-4'}>
          <ThemedView className={'flex-1'}>
            <ThemedInput
              notCheck
              placeholder="Tìm kiếm sản phẩm"
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
          <TouchableOpacity onPress={actionModalFilter.toggleModal}>
            <AntDesign name="filter" className="mt-3" size={30} color={COLOR_SYSTEM.primary} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedView className={'mt-2 flex-1 '}>
          {listProduct?.length > 0 ? (
            <FlashList
              data={listProduct}
              renderItem={renderItemPost}
              keyExtractor={keyExtractor}
              estimatedItemSize={120}
              onEndReached={handleLoadMore}
              numColumns={2}
              onEndReachedThreshold={0.1}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={isLoadingMore ? <ActivityIndicator /> : null}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            />
          ) : (
            <ThemedView className={'flex items-center'}>
              <NotFoundItemIcon />
              <ThemedText className={'text-lg'}>Sản phẩm không tồn tại</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </SafeAreaViewUI>
      <ModalFilter
        isRefresh={refreshing}
        titleHeader="Lọc sản phẩm"
        data={DATA_FILTER_PRODUCT}
        isVisible={activeModalFilter.isOpen}
        closeModal={actionModalFilter.closeModal}
        onSelected={handleChangeFilter}
      />
    </React.Fragment>
  );
};

export default ProductScreen;
