import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '../ThemedView';
type NavigationGoBackProps = {
  extra?: React.ReactNode;
  className?: string | any;
  lightColor?: string;
  darkColor?: string;
  title?: string;
  titleAlight?: boolean;
};

const NavigationGoBack = ({
  className,
  extra,
  lightColor,
  darkColor,
  title,
  titleAlight = false,
}: NavigationGoBackProps) => {
  const router = useRouter();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (
    <ThemedView style={{ justifyContent: 'space-between' }} className={`${className} flex flex-row items-center`}>
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="angle-left" size={30} color={color} />
        </TouchableOpacity>
        <Text
          className={`${titleAlight ? 'text-center' : ''} !mt-[3px]`}
          style={{ color, fontSize: 17, fontWeight: 500, paddingLeft: 18 }}
        >
          {title ? title : 'Trở lại'}
        </Text>
      </View>
      <View>{extra}</View>
    </ThemedView>
  );
};

export default memo(NavigationGoBack);
