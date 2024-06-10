import { AppCard, AppImage } from '@/components';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProductCard from '@/components/profile/ProductCard';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  const keyExtractor = React.useCallback((_: any, index: number) => String(index), []);
  const isFocused = useIsFocused();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <AppImage
          className={`w-full h-72 object-contain`}
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

      <View style={{ flex: 1 }}>
        <FlashList
          data={['0', '1', '2', '3', '4']}
          renderItem={({ item, index }) => <AppCard mode="news" />}
          keyExtractor={keyExtractor}
          estimatedItemSize={120}
          //   refreshing={refreshing}
          //   onRefresh={pullToRefresh}
          //   onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          //   ListEmptyComponent={}
        />
      </View>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
