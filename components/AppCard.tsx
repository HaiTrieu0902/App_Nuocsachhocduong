import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { COLOR_SYSTEM } from '@/constants/Colors';
import { ThemedView } from './ThemedView';
import AppImage from './AppImage';
import { ThemedText } from './ThemedText';
type AppCardProps = {
  lightColor?: string;
  darkColor?: string;
  className?: string | any;
  mode: 'news' | '';
};

const AppCard = ({ lightColor, darkColor, className, mode }: AppCardProps) => {
  const router = useRouter();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <ThemedView className={`${className}  mt-4`}>
      <TouchableOpacity onPress={() => router.push('/home/1')}>
        <View
          style={styleSheet}
          className={`flex flex-row gap-4 items-center !shadow-2xl rounded-[12px] 
            !w-full border`}
        >
          <AppImage
            style={{ borderRadius: 8 }}
            size="medium"
            uri={'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/09/gojo-satoru-1.jpg'}
          />
          <ThemedText
            className="text-text_color_regular text-xl "
            style={{ fontWeight: 300, fontSize: 14, width: '68%' }}
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            Hệ thống lọc tổng cần được bảo trì, sục rửa, hoàn nguyên định kỳ mới có thể hoạt động tốt được. Bạn thì lại
            quá bận rộn, không có thời Hệ thống lọc tổng cần được bảo trì, sục rửa, hoàn nguyên định kỳ mới có thể hoạt
            động tốt được. Bạn thì lại quá bận rộn, không có thời
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
