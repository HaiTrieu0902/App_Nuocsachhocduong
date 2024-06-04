import { Text, View } from 'react-native';
import React, { Component, ReactNode, memo } from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
type NavigationGoBackProps = {
  extra?: React.ReactNode;
  className?: string | any;
  lightColor?: string;
  darkColor?: string;
};

const NavigationGoBack = ({ className, extra, lightColor, darkColor }: NavigationGoBackProps) => {
  const router = useRouter();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (
    <ThemedView style={{ justifyContent: 'space-between' }} className={`${className} flex flex-row items-center`}>
      <View className="flex flex-row w-full  items-center">
        <FontAwesome onPress={() => router.back()} name="angle-left" size={30} color={color} />
        <Text className="mt-[3px] " style={{ color, fontSize: 16, paddingLeft: 18 }}>
          Trở lại
        </Text>
      </View>
      {/*  */}
      <View>{extra}</View>
    </ThemedView>
  );
};

export default memo(NavigationGoBack);
