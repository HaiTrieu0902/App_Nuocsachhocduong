import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { PermissionsAndroid, Platform } from 'react-native';
import HardwarePermissions from '@/core/HardwarePermissions';

export const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('OKE NHE', authStatus);
  }
  return enabled;
};

export const getFCMToken = async (conditions: any) => {
  try {
    if (conditions) {
      messaging()
        .getToken()
        .then((token) => {
          console.log('📢 [notificationService.ts:19]', token);
        });
    } else {
      console.log('Permisstion not granted', conditions);
    }
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
