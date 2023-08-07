import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';
import {useState} from 'react';

export default function useBluetooth() {
  const [pairedDeviceList, setPairedDeviceList] = useState<BluetoothDevice[]>(
    [],
  );
  const [scanDeviceList, setScanDeviceList] = useState<BluetoothDevice[]>([]);
  let readDataListener: BluetoothEventSubscription;
  let disconnectListener: BluetoothEventSubscription;

  // useEffect(() => {
  //   return () => {
  //     readDataListener.remove();
  //     disconnectListener.remove();
  //   };
  // }, []);

  const getPairedDevices = async () => {
    const paired = await RNBluetoothClassic.getBondedDevices();
    setPairedDeviceList(paired);
  };

  const getScanDevices = async () => {
    setScanDeviceList([]);
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
    }
    return connection;
  };

  const write = async (device: BluetoothDevice, data: string) => {
    await device.write(data);
  };

  const readMessage = async (device: BluetoothDevice) => {
    await device.read();
  };

  const disconnect = async (device: BluetoothDevice) => {
    await device.disconnect();
  };

  const findConnectedDeviceByAddress = async (address: string) => {
    return await RNBluetoothClassic.getConnectedDevices().then(
      devices => devices.find(device => device.address === address) ?? null,
    );
  };

  const plotDataStreamStart = async (device: BluetoothDevice) => {
    await write(device, 'plot').then(async () => await readMessage(device));
  };

  const onStreamDataReceive = (
    device: BluetoothDevice,
    callback: (dataArr: number[]) => void,
  ) => {
    readDataListener = device.onDataReceived((data: {data: string}) => {
      const dataArr = data.data
        .split(',')
        .map((v: any) => parseInt(v || 0, 10));
      callback(dataArr);
    });
  };

  const onDisconnect = (callback: () => void) => {
    disconnectListener = RNBluetoothClassic.onDeviceDisconnected(() =>
      callback(),
    );
  };

  return {
    pairedDeviceList,
    getPairedDevices,
    scanDeviceList,
    getScanDevices,
    connect,
    write,
    readMessage,
    disconnect,
    findConnectedDeviceByAddress,
    plotDataStreamStart,
    onStreamDataReceive,
    onDisconnect,
  };
}
