import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import {PermissionsAndroid, Platform} from 'react-native';

export default function usePermission() {
  const androidPermission = async () => {
    const apiLevel = await DeviceInfo.getApiLevel();

    // Android 버전별로 권한 요청 방식 다름.
    if (apiLevel < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Bluetooth Low Energy requires Location',
          buttonNeutral: 'Ask Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      return (
        result['android.permission.BLUETOOTH_CONNECT'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.BLUETOOTH_SCAN'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
  };

  const iosPermission = async () => {
    const results = await checkMultiple([PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL]);
    console.log(results);
    return results[PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL] === 'granted';
  };
  const requestPermissions = async (cb: (isGranted: boolean) => void) => {
    if (Platform.OS === 'android') {
      const isGranted = await androidPermission();
      cb(isGranted);
    } else if (Platform.OS === 'ios') {
      const isGranted = await iosPermission();

      // 권한 미허용시 설정화면으로 이동
      // if (!isGranted) {
      //   Linking.openSettings();
      // }

      cb(isGranted);
    }
  };

  return {
    requestPermissions,
  };
}
