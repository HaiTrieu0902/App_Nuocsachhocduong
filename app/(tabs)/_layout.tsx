import { View, Text, Button } from 'react-native';
import React from 'react';
import { Tabs, router, useSegments } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROUTER } from '@/constants/enum';

export default function _layout() {
  const segments = useSegments();
  const hide = segments.includes('[id]');

  return (
    <Tabs
      initialRouteName={EROUTER.HOME}
      screenOptions={{
        tabBarActiveTintColor: COLOR_SYSTEM.primary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
          marginBottom: -4,
          marginTop: -8,
        },
        // tabBarStyle: {
        //   display: hide ? 'none' : 'flex',
        //   backgroundColor: hide ? 'transparent' : undefined,
        // },

        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={EROUTER.HOME}
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
          tabBarLabel: 'Trang chủ',
        }}
      />

      <Tabs.Screen
        name={EROUTER.PRODUCT}
        options={{
          tabBarIcon: ({ color }) => <Feather name="shopping-bag" size={24} color={color} />,
          tabBarLabel: 'Sản phẩm',
        }}
      />

      <Tabs.Screen
        name={EROUTER.MAINTENACE}
        options={{
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
          tabBarLabel: 'Bảo dưỡng',
        }}
      />

      <Tabs.Screen
        name={EROUTER.NOTIFACATION}
        options={{
          tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} />,
          tabBarLabel: 'Thông báo',
        }}
      />

      <Tabs.Screen
        name={EROUTER.PROFILE}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
          tabBarLabel: 'Cá nhân',
        }}
      />
    </Tabs>
  );
}
