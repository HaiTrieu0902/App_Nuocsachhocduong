import { SafeAreaViewUI } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { EROUTER } from '@/constants/enum';
import { Link, useRouter } from 'expo-router';
import React from 'react';

const InformationUserScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaViewUI className="px-6">
      <NavigationGoBack title="Thông tin người dùng" titleAlight />
      <ThemedView className="mt-4">
        <ThemedText className="text-text_color font-semibold text-[28px] mt-2 ">Thông tin người dùng</ThemedText>
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default InformationUserScreen;
