import {StyleSheet, View} from 'react-native';
import {BluetoothScreenNavigationProp} from '../types/navigationType';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect} from 'react';
import BluetoothList from '../components/BluetoothList';
import usePermission from '../hooks/usePermission';
import useBluetooth from '../hooks/useBluetooth';
import {Button} from '@rneui/themed';

interface Props {
  navigation: BluetoothScreenNavigationProp;
}

const BluetoothScreen: React.FC<Props> = ({navigation}) => {
  const {requestPermissions} = usePermission();
  const {pairedDeviceList, getPairedDevices, scanDeviceList, getScanDevices} =
    useBluetooth();

  useEffect(() => {
    requestPermissions(isGranted => {
      isGranted ? getPairedDevices() : console.log('실패');
    });
  }, [getPairedDevices, requestPermissions]);

  const handleBluetoothPress = (address: string) => {
    navigation.push('Graph');
    console.log(address);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <BluetoothList
          title={'연결된 디바이스'}
          data={pairedDeviceList}
          onPress={address => handleBluetoothPress(address)}
        />
        <BluetoothList
          title={'검색된 디바이스'}
          data={scanDeviceList}
          onPress={address => handleBluetoothPress(address)}
        />
      </View>
      <Button onPress={getScanDevices}>장치 검색 시작</Button>
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
