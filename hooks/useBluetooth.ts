import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {useState} from 'react';

export default function useBluetooth() {
  const [pairedDeviceList, setPairedDeviceList] = useState<BluetoothDevice[]>(
    [],
  );
  const [scanDeviceList, setScanDeviceList] = useState<BluetoothDevice[]>([]);
  const [connectDevice, setConnectDevice] = useState<BluetoothDevice>();

  const getPairedDevices = async () => {
    const paired = await RNBluetoothClassic.getBondedDevices();
    setPairedDeviceList(paired);
  };

  const getScanDevices = async () => {
    const unpaired = await RNBluetoothClassic.startDiscovery();
    const namedDeviceList = unpaired.filter(v => v.name !== v.address);
    setScanDeviceList(namedDeviceList);
    return namedDeviceList.length;
  };

  const connect = async (device: BluetoothDevice) => {
    let connection = await device.isConnected();
    if (!connection) {
      connection = await device.connect({
        delimiter: '\n',
      });
      setConnectDevice(device);
    }
  };

  return {
    pairedDeviceList,
    getPairedDevices,
    scanDeviceList,
    getScanDevices,
    connectDevice,
    connect,
  };
}
