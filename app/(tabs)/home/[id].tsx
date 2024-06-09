import { SafeAreaViewUI } from '@/components';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const DetailNewsScreen = () => {
  const { id, news } = useLocalSearchParams();
  return (
    <SafeAreaViewUI className="px-5">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Blog Post Details {id}</Text>
        <Text style={{ fontSize: 18 }}>Written by {news}</Text>
        <Button onPress={() => router.back()} title="Go Back" />
      </View>
    </SafeAreaViewUI>
  );
};

export default DetailNewsScreen;
