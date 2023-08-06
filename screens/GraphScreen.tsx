import {StyleSheet} from 'react-native';
import LineChart from '../components/LineChart';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {Text} from '@rneui/themed';
import {RootStackParamList} from '../types/navigationType';
import {RouteProp} from '@react-navigation/native';

interface GraphScreenProps {
  route: RouteProp<RootStackParamList, 'Graph'>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({route}) => {
  const {address} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{address}</Text>
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
