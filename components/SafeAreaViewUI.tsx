import { StatusBar, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  lightColor?: string;
  darkColor?: string;
};
const SafeAreaViewUI = ({ children, style, className, lightColor, darkColor }: Props) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  // useEffect(() => {
  //   StatusBar.setBackgroundColor(COLOR.WHITE);
  //   StatusBar.setBarStyle('dark-content');
  // }, []);

  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        { paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1, backgroundColor: backgroundColor },
        style,
      ]}
      className={className}
    >
      {children}
    </View>
  );
};
export default SafeAreaViewUI;
