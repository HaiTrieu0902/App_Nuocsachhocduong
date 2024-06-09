import { View, Text, Button } from 'react-native';
import React from 'react';
import { Tabs, router } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROUTER } from '@/constants/enum';

export default function _layout() {
  return (
    <Tabs
      initialRouteName={EROUTER.HOME}
      screenOptions={{
        tabBarActiveTintColor: COLOR_SYSTEM.primary,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '400',
          marginBottom: 0,
          marginTop: -8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={EROUTER.HOME}
        options={{
          tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
          tabBarLabel: 'Home',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
