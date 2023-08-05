import {StyleSheet, View} from 'react-native';
import {BluetoothScreenNavigationProp} from '../types/navigationType';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import BluetoothList from '../components/BluetoothList';

interface Props {
  navigation: BluetoothScreenNavigationProp;
}

const BluetoothScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <BluetoothList title={'연결된 디바이스'} />
        <BluetoothList title={'검색된 디바이스'} />
      </View>
      {/*<Button title={'그래프 열기'} onPress={() => navigation.push('Graph')} />*/}
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
