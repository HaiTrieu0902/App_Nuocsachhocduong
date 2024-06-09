import { View, Text, Image, Platform, StyleSheet, Button } from 'react-native';
import React from 'react';
import { SafeAreaViewUI } from '@/components';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from '@/components/HelloWave';
import { router } from 'expo-router';

const HomeScreen = () => {
  return (
    <SafeAreaViewUI className="px-5">
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes. Press{' '}
            <ThemedText type="defaultSemiBold">{Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}</ThemedText> to
            open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>Tap the Explore tab to learn more about what's included in this starter app.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
        <View className="bg-red-500">
          <Text>Blue create</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-800">Chán trong cái người thật! 🎉</Text>
        </View>
        <Button onPress={() => router.push('/home/1')} title="Go To Home 1" />
      </ParallaxScrollView>
    </SafeAreaViewUI>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

// import { Button, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { router, useLocalSearchParams } from 'expo-router';

// const DetailNewsScreen = () => {
//   const { id, author } = useLocalSearchParams();
//   return (
//     <View>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ fontSize: 18 }}>Blog Post Details {id}</Text>
//         <Text style={{ fontSize: 18 }}>Written by {author}</Text>
//         <Button onPress={() => router.back()} title="Go Back" />
//       </View>
//     </View>
//   );
// };

// export default DetailNewsScreen;
