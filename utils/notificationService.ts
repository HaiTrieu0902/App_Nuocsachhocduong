import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { PermissionsAndroid, Platform } from 'react-native';
import HardwarePermissions from '@/core/HardwarePermissions';

export async function requestPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFCMToken();
    } else {
      console.log('permisstion Token');
    }
  } else {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('get FCM token');
      getFCMToken();
    }
  }
}

export const getFCMToken = async () => {
  try {
    // const defaultMess = firebase.messaging();
    // return defaultMess.getToken();
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('token', token);
  } catch (error) {
    console.log('📢 [notificationService.ts:19]', error);
  }
};

///
export const getTokenFCM = async () => {
  const defaultMess = firebase.messaging();
  return defaultMess.getToken();
};

export const requestPermissionFCM = async () => {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } else {
    await HardwarePermissions.requestNotificationPermission();
  }
};

export const registerTokenFCM = async () => {
  try {
    const enabled = await requestPermissionFCM();
    console.log({ enabled });
    if (enabled) {
      const deviceToken = await getTokenFCM();
      console.log('📢[notification.ts:22]: deviceToken: ', deviceToken);
      // const timezone = new Date().getTimezoneOffset();
      // const platform = Platform.OS;
      //  await registerDeviceTokenAPI(deviceToken);
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeTokenFCM = async () => {
  try {
    const deviceToken = await getTokenFCM();
    //  await removeDeviceTokenAPI(deviceToken);
    await messaging().deleteToken();
  } catch (err) {
    console.log('📢 [notification.ts:38] err', err);
  }
};
