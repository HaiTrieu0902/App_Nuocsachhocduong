import { SafeAreaViewUI } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { INews } from '@/models/news.model';
import { getDetailNewsAPI } from '@/services/api/news.api';
import { updateImageUrls } from '@/utils/helper';
import { createHtmlTemplate } from '@/utils/htmlTemplate';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';

const DetailNewsScreen = () => {
  const { id, news } = useLocalSearchParams();
  const isFocused = useIsFocused();
  const [data, setData] = useState<INews>({});

  useEffect(() => {
    if (id) {
      const handleGetNewsDetail = async () => {
        try {
          const res = await getDetailNewsAPI(id as string);
          setData(res?.data);
        } catch (error: any) {}
      };
      handleGetNewsDetail();
    }
  }, [id, isFocused]);

  const content = updateImageUrls(data?.content ? (data?.content as string) : '');

  return (
    <SafeAreaViewUI className="px-5">
      <NavigationGoBack title={`${data?.title}`} />
      <ThemedView style={{ flex: 1 }}>
        <WebView
          style={{ borderRadius: 8 }}
          originWhitelist={['*']}
          source={{ html: createHtmlTemplate(content || ''), baseUrl: '' }}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default DetailNewsScreen;
