import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { COLOR_SYSTEM } from '@/constants/Colors';
import { BASE_URL } from '@/constants/urls';
import { INews } from '@/models/news.model';
import AppImage from './AppImage';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IProduct } from '@/models/product.model';
type AppCardProps = {
  lightColor?: string;
  darkColor?: string;
  className?: string | any;
  mode: 'news' | 'product';
  data: INews | IProduct | any;
};

// const isNews = (data: INews | IProduct): data is INews =>{
//   return (data as INews).thumbnail !== undefined;
// }

// const isProduct = (data: INews | IProduct): data is IProduct => {
//   return (data as IProduct).price !== undefined;
// }

const AppCard = ({ lightColor, darkColor, className, mode, data }: AppCardProps) => {
  const router = useRouter();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <ThemedView className={`${className}  mt-4`}>
      {mode === 'product' ? (
        <TouchableOpacity className="!w-full" onPress={() => router.push(`/product/${data?.id}`)}>
          <View
            style={styleSheetProduct}
            className={`flex  flex-col gap-2  !shadow-2xl rounded-[12px] 
        !w-full border`}
          >
            <AppImage
              style={{ borderRadius: 8 }}
              size="xxl"
              className={'object-cover'}
              uri={`${BASE_URL}${data?.images[0]}`}
            />
            <ThemedText
              className="text-text_color_regular text-xl font-semibold  pl-4"
              style={{ fontWeight: 300, fontSize: 14 }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data?.name}
            </ThemedText>

            <ThemedText className="!text-primary text-base font-medium text-left pl-4 ">
              {`${Number(data?.price - (data?.price * data?.discount) / 100).toLocaleString()} `} VNĐ
            </ThemedText>
            <ThemedText
              style={{ textDecorationLine: 'line-through', marginBottom: 6 }}
              className="!text-text_color_regular text-base  text-left font-medium !line-through pl-4 "
            >
              {Number(data?.price).toLocaleString()} VNĐ
            </ThemedText>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push(`/home/${data?.id}`)}>
          <View
            style={styleSheet}
            className={`flex flex-row gap-4 items-center !shadow-2xl rounded-[12px] 
        !w-full border`}
          >
            <AppImage style={{ borderRadius: 8 }} size="medium" uri={`${BASE_URL}${data?.thumbnail}`} />
            <ThemedText
              className="text-text_color_regular text-xl "
              style={{ fontWeight: 300, fontSize: 14, width: '68%' }}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {data?.summary}
            </ThemedText>
          </View>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

export default memo(AppCard);

export const styleSheet = {
  borderRadius: 10,
  padding: 0,
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

export const styleSheetProduct = {
  borderRadius: 10,
  padding: 0,
  borderColor: COLOR_SYSTEM.textColorLight,
};
