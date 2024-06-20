import { SafeAreaViewUI, ThemedButton } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROLE } from '@/constants/enum';
import { getAuthUser } from '@/hooks/useStorage';
import { IProduct } from '@/models/product.model';
import { getDetailProductAPI } from '@/services/api/product.api';
import { updateImageUrls } from '@/utils/helper';
import { createHtmlTemplate } from '@/utils/htmlTemplate';
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';

const DetailProductScreen = () => {
  const { id, product } = useLocalSearchParams();
  const isFocused = useIsFocused();
  const [data, setData] = useState<IProduct>({} as IProduct);
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = await getAuthUser();
      setAuthUser(token);
    };
    fetchTokenAndUser();
  }, []);

  useEffect(() => {
    if (id) {
      const handleGetNewsDetail = async () => {
        try {
          const res = await getDetailProductAPI(id as string);
          setData(res?.data);
        } catch (error: any) {}
      };
      handleGetNewsDetail();
    }
  }, [id, isFocused]);

  const content = updateImageUrls(data?.content ? (data?.content as string) : '');
  console.log('authUser?.role', authUser?.role);
  return (
    <SafeAreaViewUI className="px-5">
      <NavigationGoBack title={`${data?.name}`} />
      <ThemedView style={{ flex: 1 }}>
        <WebView
          style={{ borderRadius: 8 }}
          originWhitelist={['*']}
          source={{ html: createHtmlTemplate(content || ''), baseUrl: '' }}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>

      {authUser?.role?.role === EROLE?.PRINCIPAL && (
        <ThemedView className={'mt-4 -mb-4'}>
          <ThemedButton
            text="Yêu cầu lắp đặt"
            svgIcon={<AntDesign name="arrowright" size={24} color={COLOR_SYSTEM.white} />}
            iconPosition="right"
            className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-primary `}
            onPress={() => {}}
          />
        </ThemedView>
      )}
    </SafeAreaViewUI>
  );
};

export default DetailProductScreen;
