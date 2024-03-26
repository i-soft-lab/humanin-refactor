import {View} from 'react-native';
import {BluetoothScreenNavigationProp} from '../types/navigationType';
import React, {useEffect, useState} from 'react';
import BluetoothList from '../components/BluetoothList';
import usePermission from '../hooks/usePermission';
import {showErrorToast} from '../components/Toast';
import useBle from '../hooks/useBle';
import {DeviceId} from 'react-native-ble-plx';
import {useBleContext} from '../context/BleProvider';
import SplashScreen from 'react-native-splash-screen';
import {useTranslation} from 'react-i18next';
import IconPulseButton from '../components/common/IconPulseButton';
import ScreenLayout from '../components/common/ScreenLayout';

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
    <ScreenLayout>
      <IconPulseButton
        text={isScan ? t('searching_device') : t('press_to_search')}
        iconName="bluetooth"
        onPress={handleScanDevice}
        isPulse={isScan}
      />
      <View className="flex basis-3/5">
        <BluetoothList
          title={t('discovered_devices')}
          data={scanDeviceList}
          isLoading={isLoading}
          onPress={id => handleBluetoothPress(id)}
        />
      </View>
    </ScreenLayout>
  );
};

export default BleScreen;
