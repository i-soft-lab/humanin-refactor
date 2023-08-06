import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {useState} from 'react';

export default function useBluetooth() {
  const [pairedDeviceList, setPairedDeviceList] = useState<BluetoothDevice[]>(
    [],
  );

  const getPairedDevices = async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices();
      setPairedDeviceList(paired);
    } catch (err) {
      console.error('페어링된 디바이스 가져오기 실패');
    }
  };

  return {
    pairedDeviceList,
    getPairedDevices,
  };
}
