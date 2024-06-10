import { SafeAreaViewUI } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import ProductCard from '@/components/profile/ProductCard';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

const ListSchoolScreen = () => {
  const keyExtractor = React.useCallback((_: string, index: number) => String(index), []);
  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title="Danh sách trường học" titleAlight />
      <ThemedView className={'mt-4'}></ThemedView>
      <FlashList
        data={['0', '1', '2', '3', '4']}
        renderItem={({ item, index }) => <ProductCard mode="school" />}
        keyExtractor={keyExtractor}
        estimatedItemSize={120}
        //   refreshing={refreshing}
        //   onRefresh={pullToRefresh}
        //   onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        //   ListEmptyComponent={}
      />
    </SafeAreaViewUI>
  );
};

export default ListSchoolScreen;
