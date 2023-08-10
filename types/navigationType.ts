import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DeviceId} from 'react-native-ble-plx';

export type RootStackParamList = {
  Graph: {id: DeviceId; name: string};
  Bluetooth: undefined;
};

export type BluetoothScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Bluetooth'
>;

export type GraphScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Graph'
>;
