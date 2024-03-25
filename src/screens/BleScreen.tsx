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
import {useTranslation} from 'react-i18next';

interface Props {
  navigation: BluetoothScreenNavigationProp;
}

const BleScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {bleManager} = useBleContext();
  const {requestPermissions} = usePermission();
  const {scanDeviceList, getScanDevices, connect, stopScan} =
    useBle(bleManager);
  const [isScan, setIsScan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    requestPermissions(isGranted => {
      !isGranted && showErrorToast(t('bluetooth_permission'));
    }).catch(e => {
      showErrorToast(t('permission_error'), e.message);
    });
  }, [requestPermissions, t]);

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
        showErrorToast(t('connect_failure'), e?.message);
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
        showErrorToast(t('discovery_failure'), e.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex basis-2/5 justify-center items-center mt-6">
        <BluetoothButton onPress={handleScanDevice} isScan={isScan} />
      </View>
      <View className="flex basis-3/5">
        <BluetoothList
          title={t('discovered_devices')}
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
});

export default BleScreen;
