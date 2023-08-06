import {StyleSheet} from 'react-native';
import LineChart from '../components/LineChart';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect} from 'react';
import {Text} from '@rneui/themed';
import {RootStackParamList} from '../types/navigationType';
import {RouteProp} from '@react-navigation/native';
import useBluetooth from '../hooks/useBluetooth';

interface GraphScreenProps {
  route: RouteProp<RootStackParamList, 'Graph'>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({route}) => {
  const {connectDevice} = useBluetooth();
  const {device} = route.params;

  useEffect(() => {}, [device]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>연결된 장치: {device.name}</Text>
      <LineChart />
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
