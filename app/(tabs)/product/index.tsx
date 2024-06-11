import { View, Text, Image, Platform, StyleSheet, Button } from 'react-native';
import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { router } from 'expo-router';

const ProductScreen = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
    >
      <Button onPress={() => router.push('/product/1')} title="Go To Product 1" />
    </ParallaxScrollView>
  );
};

export default ProductScreen;
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
