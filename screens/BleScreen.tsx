import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {BluetoothScreenNavigationProp} from '../types/navigationType';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import BluetoothList from '../components/BluetoothList';
import usePermission from '../hooks/usePermission';
import {Button, Text} from '@rneui/themed';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../components/Toast';
import useBle from '../hooks/useBle';
import {DeviceId} from 'react-native-ble-plx';

interface Props {
  navigation: BluetoothScreenNavigationProp;
}

const BleScreen: React.FC<Props> = ({navigation}) => {
  const {requestPermissions} = usePermission();
  const {scanDeviceList, getScanDevices, connect, stopScan} = useBle();
  const [isScan, setIsScan] = useState(false);

  useEffect(() => {
    requestPermissions(
      isGranted => !isGranted && showErrorToast('블루투스 권한을 허용해주세요'),
    ).catch(e => showErrorToast('권한 허용 오류', e.message));
  }, [requestPermissions]);

  const handleBluetoothPress = (id: DeviceId) => {
    setIsScan(false);
    showInfoToast('장치에 연결중입니다. 잠시만 기다려주세요.');
    connect(id)
      .then(({deviceName, deviceId}) => {
        if (deviceName) {
          showSuccessToast(`${deviceName} 장치에 연결되었습니다.`);
          navigation.push('Graph', {address: deviceId});
        }
      })
      .catch(e => {
        showErrorToast('연결 오류!', e?.message);
      });
  };

  const handleScanDevice = () => {
    if (isScan) {
      showInfoToast('장치 검색을 취소합니다.');
      setIsScan(false);
      stopScan();
    } else {
      showInfoToast('장치를 검색중입니다.');
      setIsScan(true);
      try {
        getScanDevices();
      } catch (e: any) {
        showErrorToast('장치 검색 실패', e.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <BluetoothList
          title={'검색된 디바이스'}
          data={scanDeviceList}
          onPress={id => handleBluetoothPress(id)}
        />
      </View>
      <Button
        onPress={handleScanDevice}
        titleStyle={{fontWeight: 'bold', fontSize: 18}}
        buttonStyle={{
          height: 50,
        }}>
        {isScan ? (
          <View style={styles.loadingButton}>
            <Text style={styles.buttonText}>장치 검색중</Text>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <Text style={styles.buttonText}>장치 검색 시작</Text>
        )}
      </Button>
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
  loadingButton: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 16,
  },
  buttonText: {
    color: 'white',
  },
});

export default BleScreen;
