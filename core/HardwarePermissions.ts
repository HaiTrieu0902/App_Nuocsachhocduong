import {
  check,
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { Alert, Platform } from 'react-native';

const fnGoToSetting = (message: string) => {
  Alert.alert('Access permission', message, [
    {
      text: 'Cancel',
      onPress: () => {
        return;
      },
    },
    {
      text: 'Go to Settings',
      onPress: async () => {
        await openSettings();
      },
    },
  ]);
};
class HardwarePermissions {
  public static requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const resultAnd = await check(PERMISSIONS.ANDROID.CAMERA);
        // console.log('PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE', resultAnd);

        switch (resultAnd) {
          case RESULTS.GRANTED:
            return true;
          case RESULTS.BLOCKED:
            fnGoToSetting(
              'nuocsachhocduong requires access to your camera so you can upload a photo for your profile?',
            );
            return false;
          case RESULTS.DENIED:
            const granted = await request(PERMISSIONS.ANDROID.CAMERA);
            if (granted !== RESULTS.GRANTED && granted !== RESULTS.LIMITED) {
              fnGoToSetting(
                'nuocsachhocduong requires access to your camera so you can upload a photo for your profile?',
              );
            }
            return granted === RESULTS.GRANTED;
          default:
            return false;
        }
      } else {
        const resultIOS = await check(PERMISSIONS.IOS.CAMERA);
        // console.log(resultIOS, `step 1`);
        switch (resultIOS) {
          case RESULTS.GRANTED:
            return true;
          case RESULTS.LIMITED:
            return true;
          default: {
            const granted = await request(PERMISSIONS.IOS.CAMERA);
            console.log(granted, `step2`);
            if (granted === RESULTS.BLOCKED || granted === RESULTS.UNAVAILABLE) {
              fnGoToSetting(
                'nuocsachhocduong requires access to your camera so you can upload a photo for your profile?',
              );
            }
            return granted === RESULTS.GRANTED;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  public static requestReadStoragePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission =
          Platform.Version < 32 ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
        const resultAnd = await check(permission);
        // console.log('PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE', resultAnd);

        switch (resultAnd) {
          case RESULTS.GRANTED:
            return true;
          case RESULTS.BLOCKED:
            fnGoToSetting('nuocsachhocduong would like to access photos, media, files on your device?');
            return false;
          case RESULTS.DENIED:
            const granted = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            if (granted !== RESULTS.GRANTED && granted !== RESULTS.LIMITED) {
              fnGoToSetting('nuocsachhocduong would like to access photos, media, files on your device?');
            }
            return granted === RESULTS.GRANTED;
          default:
            return false;
        }
      } else {
        const resultIOS = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        // console.log(resultIOS, `PERMISSIONS.IOS.PHOTO_LIBRARY step 1`);
        switch (resultIOS) {
          case RESULTS.GRANTED:
            return true;
          case RESULTS.LIMITED:
            return true;
          default: {
            const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            // console.log(granted, `PERMISSIONS.IOS.PHOTO_LIBRARY step2`);
            if (granted === RESULTS.BLOCKED || granted === RESULTS.UNAVAILABLE) {
              fnGoToSetting('nuocsachhocduong would like to access photos, media, files on your device?');
            }
            return granted === RESULTS.GRANTED;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  public static requestWriteStoragePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version > 29) {
          return true;
        }
        const resultAnd = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        // console.log('PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE', resultAnd);
        switch (resultAnd) {
          case RESULTS.GRANTED:
            return true;
          case RESULTS.BLOCKED:
            fnGoToSetting('nuocsachhocduong would like to access photos, media, files on your device?');
            return false;
          case RESULTS.DENIED:
            const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            if (granted !== RESULTS.GRANTED && granted !== RESULTS.LIMITED) {
              fnGoToSetting('nuocsachhocduong would like to access photos, media, files on your device?');
            }
            return granted === RESULTS.GRANTED;
          default:
            return false;
        }
      } else {
        const resultIOS = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        // console.log(resultIOS, `PERMISSIONS.IOS.PHOTO_LIBRARY step 1`);
        switch (resultIOS) {
          case RESULTS.GRANTED:
            return true;
          case RESULTS.LIMITED:
            return true;
          default: {
            const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            // console.log(granted, `PERMISSIONS.IOS.PHOTO_LIBRARY step2`);
            if (granted === RESULTS.BLOCKED || granted === RESULTS.UNAVAILABLE) {
              fnGoToSetting('nuocsachhocduong would like to access photos, media, files on your device?');
            }
            return granted === RESULTS.GRANTED;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  public static checkATTPermission = async () => {
    if (Platform.OS === 'ios') {
      const resultIOS = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      console.log(resultIOS, `step 1`);
    }
  };

  public static requestNotificationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const resultAnd = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        console.log('📢[HardwarePermissions.ts:167]: resultAnd: ', resultAnd);

        switch (resultAnd) {
          case RESULTS.GRANTED:
            return true;
          case RESULTS.BLOCKED:
            fnGoToSetting('Nước học đường muốn gửi thông báo cho bạn. Vui lòng cấp quyền');
            return false;
          case RESULTS.DENIED:
            const granted = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
            if (granted !== RESULTS.GRANTED && granted !== RESULTS.LIMITED) {
              fnGoToSetting('Nước học đường muốn gửi thông báo cho bạn. Vui lòng cấp quyền');
            }
            return granted === RESULTS.GRANTED;
          default:
            return false;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default HardwarePermissions;
