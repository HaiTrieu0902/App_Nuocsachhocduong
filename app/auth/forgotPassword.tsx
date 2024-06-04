import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaViewUI } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';

const forgotPassword = () => {
  console.log('hihii');
  return (
    <SafeAreaViewUI className="px-5">
      <NavigationGoBack />
      <ThemedView className="">
        <ThemedText className="text-text_color font-semibold text-[32px] mt-2 uppercase">Quên mật khẩu</ThemedText>
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default forgotPassword;

const styles = StyleSheet.create({});
