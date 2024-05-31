import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>LOGIn PAGE</Text>
      <Link href={'(tabs)/feed'} asChild>
        <Button title="Go to Contact Page" />
      </Link>
    </View>
  );
};

export default LoginScreen;
