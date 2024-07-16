import { COLOR_SYSTEM } from '@/constants/Colors';
import { EROUTER } from '@/constants/enum';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
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
          marginBottom: Platform.OS === 'android' ? 4 : -4,
          marginTop: Platform.OS === 'android' ? -8 : -8,
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
