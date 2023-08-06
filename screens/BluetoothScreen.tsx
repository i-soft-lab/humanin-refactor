import {StyleSheet, View} from 'react-native';
import {BluetoothScreenNavigationProp} from '../types/navigationType';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect} from 'react';
import BluetoothList from '../components/BluetoothList';
import usePermission from '../hooks/usePermission';
import useBluetooth from '../hooks/useBluetooth';
import {Button} from '@rneui/themed';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../components/Toast';

interface Props {
  navigation: BluetoothScreenNavigationProp;
}

const BluetoothScreen: React.FC<Props> = ({navigation}) => {
  const {requestPermissions} = usePermission();
  const {
    pairedDeviceList,
    getPairedDevices,
    scanDeviceList,
    getScanDevices,
    connect,
  } = useBluetooth();

  useEffect(() => {
    requestPermissions(isGranted => {
      isGranted &&
        getPairedDevices().catch(e =>
          showErrorToast('페어링된 디바이스 가져오기 실패', e?.message),
        );
    });
  }, [getPairedDevices, requestPermissions]);

  const handleBluetoothPress = (device: BluetoothDevice) => {
    showInfoToast('info', '장치에 연결중입니다. 잠시만 기다려주세요.', false);
    connect(device)
      .then((connection: boolean) => {
        if (connection) {
          showSuccessToast('success', `${device.name} 장치에 연결되었습니다.`);
          navigation.push('Graph', {device: device});
        }
      })
      .catch(e => {
        showErrorToast('error', '연결 오류!', e?.message);
      });
  };

  const handleScanDevice = () => {
    showInfoToast('info', '장치를 검색중입니다. 잠시만 기다려주세요.', false);
    getScanDevices()
      .then(count =>
        showSuccessToast('장치 검색 성공', `${count}개의 장치를 발견했습니다.`),
      )
      .catch(e => showErrorToast('error', '장치 검색 실패', e.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <BluetoothList
          title={'연결된 디바이스'}
          data={pairedDeviceList}
          onPress={device => handleBluetoothPress(device)}
        />
        <BluetoothList
          title={'검색된 디바이스'}
          data={scanDeviceList}
          onPress={device => handleBluetoothPress(device)}
        />
      </View>
      <Button onPress={handleScanDevice}>장치 검색 시작</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    flex: 1,
    display: 'flex',
    rowGap: 16,
    margin: 16,
  },
});

export default BluetoothScreen;
