import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Graph: {address: string};
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
