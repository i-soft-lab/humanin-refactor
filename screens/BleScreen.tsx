import {StyleSheet, View} from 'react-native';
import {BluetoothScreenNavigationProp} from '../types/navigationType';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import BluetoothList from '../components/BluetoothList';
import usePermission from '../hooks/usePermission';
import {showErrorToast} from '../components/Toast';
import useBle from '../hooks/useBle';
import {DeviceId} from 'react-native-ble-plx';
import {useBleContext} from '../context/BleProvider';
import BluetoothButton from '../components/BluetoothButton';
import SplashScreen from 'react-native-splash-screen';
import { useLanguage } from '../context/LanguageProvider';

interface Props {
  navigation: BluetoothScreenNavigationProp;
}

const BleScreen: React.FC<Props> = ({navigation}) => {
  const {bleManager} = useBleContext();
  const {requestPermissions} = usePermission();
  const {scanDeviceList, getScanDevices, connect, stopScan} =
    useBle(bleManager);
  const [isScan, setIsScan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {language} = useLanguage();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    requestPermissions(
      isGranted => {
        const errorMsg = language === 'ko' ? '블루투스 권한을 허용해주세요' : 'Please allow Bluetooth permission';
        !isGranted && showErrorToast(errorMsg);
      },
    ).catch(e => {
      const errorMsg = language === 'ko' ? '권한 허용 오류' : 'Permission Error';
      showErrorToast(errorMsg, e.message)
    });
  }, [requestPermissions]);

  const handleBluetoothPress = (id: DeviceId) => {
    setIsScan(false);
    setIsLoading(true);
    connect(id)
      .then(connectedDevice => {
        /** Graph로 이동 */
        navigation.push('Graph', {
          id: connectedDevice.id,
          name: connectedDevice.name!,
        });
      })
      .catch(e => {
        const errMsg = language === 'ko' ? '장치에 연결할 수 없습니다.' : 'Unable to connect to the device.';

        showErrorToast(errMsg, e?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleScanDevice = () => {
    if (isScan) {
      setIsScan(false);
      stopScan();
    } else {
      setIsScan(true);
      try {
        getScanDevices();
      } catch (e: any) {
        const errMsg = language === 'ko' ? '장치 검색 실패' : 'Device discovery failed';
        showErrorToast(errMsg, e.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <BluetoothButton onPress={handleScanDevice} isScan={isScan} />
      </View>
      <View style={styles.listContainer}>
        <BluetoothList
          title={language === 'ko' ? '검색된 디바이스' : 'Discovered Devices'}
          data={scanDeviceList}
          isLoading={isLoading}
          onPress={id => handleBluetoothPress(id)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101945',
    display: 'flex',
    rowGap: 16,
  },
  avatarContainer: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  listContainer: {
    flex: 3,
    display: 'flex',
  },
});

export default BleScreen;
