import {NativeStackNavigationProp} from 'react-native-screens/native-stack';

export type RootStackParamList = {
  Graph: undefined;
  Bluetooth: undefined;
};

export type BluetoothScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Bluetooth'
>;
