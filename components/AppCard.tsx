import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { COLOR_SYSTEM } from '@/constants/Colors';
import { ThemedView } from './ThemedView';
import AppImage from './AppImage';
import { ThemedText } from './ThemedText';
import { INews } from '@/models/news.model';
import { BASE_URL } from '@/constants/urls';
type AppCardProps = {
  lightColor?: string;
  darkColor?: string;
  className?: string | any;
  mode: 'news' | '';
  data: INews;
};

const AppCard = ({ lightColor, darkColor, className, mode, data }: AppCardProps) => {
  const router = useRouter();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <ThemedView className={`${className}  mt-4`}>
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
