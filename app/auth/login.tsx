import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaViewUI } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const LoginScreen = () => {
  return (
    <SafeAreaViewUI className="py-4">
      <View className="p-4">
        <ThemedView className="">
          <ThemedText type="default" className="text-2xl">
            Explore
          </ThemedText>
        </ThemedView>
      </View>
    </SafeAreaViewUI>
  );
};

export default LoginScreen;
