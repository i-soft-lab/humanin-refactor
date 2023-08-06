import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {BluetoothDevice} from 'react-native-bluetooth-classic';

export type RootStackParamList = {
  Graph: {device: BluetoothDevice};
  Bluetooth: undefined;
};

export type BluetoothScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Bluetooth'
>;
