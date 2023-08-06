import {StyleSheet} from 'react-native';
import LineChart from '../components/LineChart';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import {RootStackParamList} from '../types/navigationType';
import {RouteProp} from '@react-navigation/native';
import useBluetooth from '../hooks/useBluetooth';
import {showErrorToast, showSuccessToast} from '../components/Toast';

interface GraphScreenProps {
  route: RouteProp<RootStackParamList, 'Graph'>;
}

type ChartData = {y: number}[];

const GraphScreen: React.FC<GraphScreenProps> = ({route}) => {
  const {write, readMessage} = useBluetooth();
  const {device} = route.params;
  const [chartData, setChartData] = useState<ChartData>([{y: 0}]);

  useEffect(() => {
    write(device!)
      .then(() => showSuccessToast('성공')) //TODO 디버깅용
      .catch(e => {
        showErrorToast('차트 데이터를 가져올 수 없습니다.', e.message);
      });
  }, [device, write]);

  useEffect(() => {
    readMessage(device).then(() => {
      device.onDataReceived((data: {data: string}) => {
        const dataArr = data.data
          .split(',')
          .map((v: any) => parseInt(v || 0, 10));
        handleChartData(dataArr);
      });
    });
  }, [device, readMessage]);

  const handleChartData = (dataArr: number[]) => {
    const [data, flag] = dataArr;
    setChartData([...chartData, {y: data}]);
    if (flag === 1) {
      console.log(data, flag);
      // sendMqttMessage('1');
    } else if (flag === 2) {
      console.log(data, flag);
      // sendMqttMessage('0');
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
});

export default GraphScreen;
