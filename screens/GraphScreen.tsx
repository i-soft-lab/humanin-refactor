import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../types/navigationType';
import {RouteProp} from '@react-navigation/native';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../components/Toast';
import useBluetooth from '../hooks/useBluetooth';
import LineChart from '../components/LineChart';
import usePlotData from '../hooks/usePlotData';
import SwitchWithText from '../components/SwitchWithText';

interface GraphScreenProps {
  route: RouteProp<RootStackParamList, 'Graph'>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({route}) => {
  const {address} = route.params;
  const {
    connect,
    connectedDevice,
    isConnected,
    setIsConnected,
    disconnect,
    findConnectedDeviceByAddress,
    plotDataStreamStart,
    onStreamDataReceive,
    onDisconnect,
  } = useBluetooth(address);
  const {chartData, handleChartData} = usePlotData();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (connectedDevice && isConnected) {
      plotDataStreamStart(connectedDevice)
        .then(() => {
          console.log('읽기 쓰기 완료?');
          onStreamDataReceive(connectedDevice, handleChartData);
        })
        .catch(e => showErrorToast('데이터를 받아올 수 없습니다', e.message));
    }

    // 블루투스 연결 해제 리스너 등록
    onDisconnect(() => {});
  }, [connectedDevice, isConnected]);

  useEffect(() => {
    return () => {
      findConnectedDeviceByAddress(address)
        .then(
          device =>
            device &&
            disconnect(device)
              .then(() =>
                showSuccessToast(
                  '디바이스와 연결을 종료합니다.',
                  '뒤로가기를 눌러서 디바이스 연결이 종료되었습니다.',
                ),
              )
              .catch(() => showInfoToast('디바이스 초기화 버튼을 눌러주세요')),
        )
        .catch(() => console.warn('연결 해제할 디바이스가 없음'));
    };
  }, []);

  const handleConnectTogglePress = () => {
    setIsLoading(true);
    if (!isConnected) {
      connect(connectedDevice!)
        .then(() => {
          showSuccessToast('디바이스에 다시 연결되었습니다.');
        })
        .catch(e => showErrorToast('디바이스 연결 실패', e.message))
        .finally(() => setIsLoading(false));
    } else {
      disconnect(connectedDevice!)
        .then(() => {
          setIsConnected(false);
          showSuccessToast('디바이스와 연결을 종료합니다.');
        })
        .catch(e => showErrorToast('디바이스 연결 종료 실패', e.message))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SwitchWithText
        title="연결된 기기"
        subTitle={connectedDevice?.name}
        switchValue={isConnected}
        isLoading={isLoading}
        onPress={handleConnectTogglePress}
      />
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
