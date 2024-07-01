import { SafeAreaViewUI } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import ProductCard from '@/components/profile/ProductCard';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const ListSchoolScreen = () => {
  const { schools } = useLocalSearchParams();
  const parsedSchools = JSON.parse(schools as never);
  const keyExtractor = React.useCallback((_: string, index: number) => String(index), []);
  const data = '';
  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title="Danh sách trường học phụ trách" titleAlight />
      <ThemedView className={'mt-4'}></ThemedView>
      <FlashList
        data={(parsedSchools as never) || []}
        renderItem={({ item, index }) => <ProductCard data={item || []} mode="school" />}
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
