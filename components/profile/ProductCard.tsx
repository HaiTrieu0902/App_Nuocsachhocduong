import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import AppImage from '../AppImage';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EPUSH_ROUTER } from '@/constants/enum';
import { BASE_URL } from '@/constants/urls';
type ProductCardProps = {
  lightColor?: string;
  darkColor?: string;
  className?: string | any;
  mode: 'school' | 'orders';
  data: any;
};

const ProductCard = ({ lightColor, darkColor, className, mode, data }: ProductCardProps) => {
  const router = useRouter();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <ThemedView className={`${className}  mt-4`}>
      <TouchableOpacity
        onPress={() => router.push({ pathname: `${EPUSH_ROUTER.DETAIL_INSTALL_RECORD}`, params: { id: data?.id } })}
      >
        <View
          style={styleSheet}
          className={`flex flex-row gap-4 items-center !shadow-2xl rounded-[12px] !w-full border`}
        >
          <AppImage
            style={
              {
                borderRadius: mode === 'orders' ? 10 : '100%',
                height: mode === 'orders' ? 112 : 60,
                width: mode === 'orders' ? 112 : 60,
              } as never
            }
            className={` object-contain ${mode === 'orders' ? 'w-28 h-28' : ''}`}
            uri={`${BASE_URL}${data?.product?.images[0]}`}
          />

          {mode === 'orders' ? (
            <View style={{ width: '66%' }}>
              <ThemedText numberOfLines={2} className="text-text_color_regular text-base font-semibold ">
                {data?.product?.name}
              </ThemedText>
              <View className="flex flex-row gap-2">
                <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
                  Số lượng:
                </ThemedText>
                <ThemedText className=" text-xl font-normal " style={{ fontWeight: 500, fontSize: 14 }}>
                  {data?.quantity} thiết bị
                </ThemedText>
              </View>
              <View className="flex flex-row gap-2">
                <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
                  Trạng thái :
                </ThemedText>
                <ThemedText className="!text-primary text-xl font-normal " style={{ fontWeight: 500, fontSize: 14 }}>
                  {data?.status?.name}
                </ThemedText>
              </View>
              <View className="flex flex-row gap-2">
                <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
                  Thành tiền:
                </ThemedText>
                <ThemedText
                  className="!text-error_regular text-xl font-normal "
                  style={{ fontWeight: 500, fontSize: 14 }}
                >
                  {Number(data?.totalAmount).toLocaleString()} VNĐ
                </ThemedText>
              </View>
            </View>
          ) : (
            <View>
              <ThemedText className="text-text_color_regular text-xl font-semibold text-center">
                Trường trung h ọc cơ sở cầu diễm
              </ThemedText>

              <ThemedText className="text-text_color_regular text-xl" style={{ fontWeight: 300, fontSize: 14 }}>
                Phú diễm, Quận Bắc Từ Liêm, Hà Nội
              </ThemedText>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default memo(ProductCard);

export const styleSheet = {
  borderRadius: 14,
  padding: 10,
  borderColor: COLOR_SYSTEM.textColorLight,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  shadowColor: COLOR_SYSTEM.black,
};
