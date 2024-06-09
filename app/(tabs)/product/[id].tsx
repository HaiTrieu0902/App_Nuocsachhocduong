import { SafeAreaViewUI } from '@/components';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { Button, Text, View } from 'react-native';
import ProductScreen from './index';

const DetailProductScreen = () => {
  const { id, product } = useLocalSearchParams();

  return (
    <SafeAreaViewUI className="px-5">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>ProductScreen Details {id}</Text>
        <Text style={{ fontSize: 18 }}>ProductScreen by {product}</Text>
        <Button onPress={() => router.back()} title="Go Back" />
      </View>
    </SafeAreaViewUI>
  );
};

export default DetailProductScreen;
