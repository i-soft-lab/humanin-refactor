import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import {
  GraphScreenNavigationProp,
  RootStackParamList,
} from '../types/navigationType';
import {RouteProp} from '@react-navigation/native';
import {showErrorToast} from '../components/Toast';
import useBluetooth from '../hooks/useBluetooth';
import LineChart from '../components/LineChart';
import RNBluetoothClassic, {
  BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';

interface GraphScreenProps {
  navigation: GraphScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Graph'>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({navigation, route}) => {
  const {write, readMessage} = useBluetooth();
  const {device} = route.params;
  const [chartData, setChartData] = useState<{y: number}[]>([{y: 135}]);
  let receiveData: {y: number}[] = [];

  useEffect(() => {
    write(device!).catch(e => {
      showErrorToast('차트 데이터를 가져올 수 없습니다.', e.message);
    });
  }, [device, write]);

  useEffect(() => {
    let readDataListener: BluetoothEventSubscription;
    if (device) {
      readMessage(device).then(() => {
        readDataListener = device.onDataReceived((data: {data: string}) => {
          const dataArr = data.data
            .split(',')
            .map((v: any) => parseInt(v || 0, 10));
          handleChartData(dataArr);
        });
      });
    }
    return () => {
      readDataListener.remove();
    };
  }, []);

  useEffect(() => {
    const disconnectListener = RNBluetoothClassic.onDeviceDisconnected(() => {
      showErrorToast('블루투스 연결이 해제되었습니다.');
      navigation.goBack();
    });
    return () => {
      disconnectListener.remove();
    };
  }, [navigation]);

  useEffect(() => {
    if (chartData.length > 450) {
      setChartData([]);
    }
  }, [chartData]);

  const handleChartData = (dataArr: number[]) => {
    const [data, flag] = dataArr;
    receiveData.push({y: data});
    if (receiveData.length >= 5) {
      setChartData(prevChartData => [...prevChartData, ...receiveData]);
      receiveData = [];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>연결된 장치: {device.name}</Text>
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
