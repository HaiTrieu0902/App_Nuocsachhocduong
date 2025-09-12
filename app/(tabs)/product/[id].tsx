import { AppImage, ModalFilter, SafeAreaViewUI, ThemedButton } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROLE, ESTATUS } from '@/constants/enum';
import { BASE_URL } from '@/constants/urls';
import useModal from '@/hooks/useModal';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IInstallRecord } from '@/models/install.model';
import { IProduct } from '@/models/product.model';
import { createInstallRecordAPI } from '@/services/api/install.api';
import { getDetailProductAPI } from '@/services/api/product.api';
import { updateImageUrls } from '@/utils/helper';
import { createHtmlTemplate } from '@/utils/htmlTemplate';
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';

const DetailProductScreen = () => {
  const showToast = useToastNotifications();
  const { id, product } = useLocalSearchParams();
  const isFocused = useIsFocused();
  const [data, setData] = useState<IProduct>({} as IProduct);
  const [authUser, setAuthUser] = useState<any>(null);
  const [activeModalFilter, actionModalFilter] = useModal();
  const [quantity, setQuantity] = useState<number>(1);

  const handlePlusOrMinusQuantity = (type: string) => {
    if (type === 'plus') {
      setQuantity(quantity + 1);
    } else if (type === 'minus' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCreateInstallRecord = useCallback(async () => {
    try {
      if (data?.id) {
        const params: IInstallRecord = {
          schoolId: authUser?.schoolIds[0],
          statusId: ESTATUS?.PEDING_INSTALL,
          productId: data?.id,
          quantity: quantity,
          accountId: authUser?.id,
          totalAmount: Number((data?.price - (data?.price * data?.discount) / 100) * quantity),
        };
        const res = await createInstallRecordAPI(params);
        showToast(`Yều cầu lắp đặt ${res?.message}, kiểm tra trong đơn hàng`, 'success', 'top');
        actionModalFilter.closeModal();
      }
    } catch (error: any) {
      showToast(`${error?.message}`, 'danger', 'top');
      console.log('error?.message', error?.message);
    }
  }, [quantity, data]);

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
            onPress={actionModalFilter.toggleModal}
          />
        </ThemedView>
      )}

      <ModalFilter
        mode="children"
        titleHeader="Yêu cầu lắp đặt sản phẩm"
        data={[]}
        isVisible={activeModalFilter.isOpen}
        closeModal={actionModalFilter.closeModal}
        onSelected={() => {}}
      >
        <View className="mt-4">
          <View className="flex flex-row gap-2">
            <AppImage
              style={{ borderRadius: 8, borderColor: COLOR_SYSTEM.textColorLight, borderWidth: 1 }}
              size="large"
              className={' !shadow-2xl rounded-[12px]  border'}
              uri={`${BASE_URL}${data?.images?.length > 0 ? data?.images[0] : ''}`}
            />
            <View className="w-[70%] gap-2">
              <ThemedText
                className="!text-black text-xl font-semibold pl-4"
                style={{ fontWeight: 300, fontSize: 14 }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {data?.name || ''}
              </ThemedText>
              <ThemedText
                className="!text-error_regular text-xl font-semibold pl-4"
                style={{ fontWeight: 500, fontSize: 15 }}
                ellipsizeMode="tail"
              >
                {`${Number(data?.price - (data?.price * data?.discount) / 100).toLocaleString()} `} VNĐ
              </ThemedText>

              <ThemedText
                className="!text-black text-xl font-semibold pl-4"
                style={{ fontWeight: 500, fontSize: 15 }}
                ellipsizeMode="tail"
              >
                Tổng:{' '}
                <ThemedText
                  className="!text-error text-xl font-semibold pl-4 italic"
                  style={{ fontWeight: 500, fontSize: 15 }}
                  ellipsizeMode="tail"
                >
                  {`${Number((data?.price - (data?.price * data?.discount) / 100) * quantity).toLocaleString()} `} VNĐ
                </ThemedText>
              </ThemedText>
            </View>
          </View>

          <View className="justify-between flex flex-row py-6 mt-6  border-t border-text_color_light items-center">
            <ThemedText
              className="!text-text_color text-xl font-semibold pl-4 "
              style={{ fontWeight: 500, fontSize: 15 }}
              ellipsizeMode="tail"
            >
              Số lượng
            </ThemedText>
            <View className=" border border-text_color_regular rounded-md flex flex-row gap-4 items-center justify-center">
              <TouchableOpacity
                onPress={() => handlePlusOrMinusQuantity('minus')}
                style={{
                  borderRightWidth: 1,
                  borderTopLeftRadius: 4,
                  borderColor: COLOR_SYSTEM.textColorRegular,
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                }}
              >
                <AntDesign name="minus" size={24} color="black" />
              </TouchableOpacity>
              <ThemedText
                className="!text-text_color text-xl font-semibold"
                style={{ fontWeight: 500, fontSize: 15 }}
                ellipsizeMode="tail"
              >
                {quantity}
              </ThemedText>
              <TouchableOpacity
                onPress={() => handlePlusOrMinusQuantity('plus')}
                style={{
                  borderLeftWidth: 1,
                  borderTopLeftRadius: 4,
                  borderColor: COLOR_SYSTEM.textColorRegular,
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                }}
              >
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="border-t border-text_color_light mb-2  py-4">
            <ThemedButton
              text="Xác nhận lắp đặt"
              onPress={handleCreateInstallRecord}
              svgIcon={<AntDesign name="arrowright" size={24} color={COLOR_SYSTEM.white} />}
              iconPosition="right"
              className={`flex flex-row justify-center items-center rounded-md py-3 gap-2 bg-primary mt-2 `}
            />
          </View>
        </View>
      </ModalFilter>
    </SafeAreaViewUI>
  );
};

export default DetailProductScreen;
