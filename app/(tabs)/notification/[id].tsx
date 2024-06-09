import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const DetailNotificationScreen = () => {
  const { id, notification } = useLocalSearchParams();
  return (
    <View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Blog Post Details {id}</Text>
        <Text style={{ fontSize: 18 }}>Written by {notification}</Text>
        <Button onPress={() => router.back()} title="Go Back" />
      </View>
    </View>
  );
};

export default DetailNotificationScreen;
