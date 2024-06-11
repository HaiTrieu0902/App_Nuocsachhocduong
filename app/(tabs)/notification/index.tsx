import { AppImage, SafeAreaViewUI } from '@/components';
import { ThemedView } from '@/components/ThemedView';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const NotificationScreen = () => {
  const [image, setImage] = useState<any>(null);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const pickImage = async () => {
    /** No permissions request is necessary for launching the image library */
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      // allowsMultipleSelection: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaViewUI className="px-6">
      <ThemedView>
        <View className="mt-4">
          <View>
            <CameraView style={{ height: 80 }} facing={facing as any}>
              <View>
                <TouchableOpacity onPress={toggleCameraFacing}>
                  <Text>Flip Camera</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        </View>

        <View className="mt-2">
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <AppImage uri={image} className={'h-5 w-5'} />}
        </View>
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default NotificationScreen;
