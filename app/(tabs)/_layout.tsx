import { View, Text, Button } from 'react-native';
import React from 'react';
import { Tabs, router } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';

export default function _layout() {
  return (
    <Tabs
      initialRouteName="feed"
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '400',
          marginBottom: 0,
          marginTop: -8,
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
          tabBarLabel: 'Feed',
          headerTitle: 'Feed',
          headerRight: () => <Button onPress={() => router.push('feed/new')} title="Add Post" />,
          headerLeft: () => (
            <Button
              onPress={() => {
                /* Thực hiện chức năng lọc ở đây */
              }}
              title="Lọc"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
          tabBarLabel: 'Profile',
          headerTitle: 'Profile',
        }}
      />
    </Tabs>
  );
}
