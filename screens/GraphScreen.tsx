import {StyleSheet} from 'react-native';
import LineChart from '../components/LineChart';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect} from 'react';
import {Text} from '@rneui/themed';
import {RootStackParamList} from '../types/navigationType';
import {RouteProp} from '@react-navigation/native';
import {showErrorToast, showSuccessToast} from '../components/Toast';
import useBluetooth from '../hooks/useBluetooth';

interface GraphScreenProps {
  route: RouteProp<RootStackParamList, 'Graph'>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({route}) => {
  const {connectDevice, connect} = useBluetooth();
  const {device} = route.params;

  useEffect(() => {
    connect(device)
      .then((_: any) =>
        showSuccessToast('success', `${device.name} 장치에 연결되었습니다.`),
      )
      .catch(e => {
        showErrorToast('error', '연결 오류!', e?.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{device.name}</Text>
      <LineChart />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default GraphScreen;
