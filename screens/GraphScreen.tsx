import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import {
  GraphScreenNavigationProp,
  RootStackParamList,
} from '../types/navigationType';
import {RouteProp} from '@react-navigation/native';
import {showErrorToast, showInfoToast} from '../components/Toast';
import useBluetooth from '../hooks/useBluetooth';
import LineChart from '../components/LineChart';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import usePlotData from '../hooks/usePlotData';

interface GraphScreenProps {
  navigation: GraphScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Graph'>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({navigation, route}) => {
  const {
    disconnect,
    findConnectedDeviceByAddress,
    plotDataStreamStart,
    onStreamDataReceive,
    onDisconnect,
  } = useBluetooth();
  const {chartData, handleChartData} = usePlotData();
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice>();
  const {address} = route.params;

  useEffect(() => {
    findConnectedDeviceByAddress(address).then(device =>
      device
        ? setConnectedDevice(device)
        : showErrorToast('블루투스 연결이 끊어졌습니다.'),
    );
    // onDisconnect(() => {
    //   showErrorToast('블루투스 연결이 끊어졌습니다.');
    //   navigation.goBack();
    // });
    return () => {
      if (connectedDevice) {
        disconnect(connectedDevice)
          .then(() => showInfoToast('디바이스 연결 종료'))
          .catch(() => showInfoToast('디바이스 초기화 버튼을 눌러주세요'));
      }
    };
  }, []);

  useEffect(() => {
    if (connectedDevice) {
      plotDataStreamStart(connectedDevice)
        .then(() => {
          onStreamDataReceive(connectedDevice, handleChartData);
        })
        .catch(e => showErrorToast('데이터를 받아올 수 없습니다', e.message));
    }
  }, [connectedDevice]);

  useEffect(() => {
    onDisconnect(() => {
      showErrorToast('블루투스 연결이 끊어졌습니다.');
      navigation.goBack();
    });
  }, [navigation, onDisconnect]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>연결된 장치: {connectedDevice?.name}</Text>
      <LineChart data={chartData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  chartContainer: {
    height: '60%',
    width: '100%',
  },
});

export default GraphScreen;
