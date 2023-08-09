import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';
import {useEffect, useState} from 'react';

type Address = string | undefined;

export default function useBluetooth(address: Address = undefined) {
  const [pairedDeviceList, setPairedDeviceList] = useState<BluetoothDevice[]>(
    [],
  );
  const [scanDeviceList, setScanDeviceList] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  let readDataListener: BluetoothEventSubscription;
  let disconnectListener: BluetoothEventSubscription;

  useEffect(() => {
    if (address) {
      findConnectedDeviceByAddress(address).then(device => {
        setConnectedDevice(device);
        setIsConnected(true);
      });
    }
    return () => {
      readDataListener && readDataListener.remove();
      disconnectListener && disconnectListener.remove();
    };
  }, []);

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
      setIsConnected(true);
      setConnectedDevice(device);
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
    return await RNBluetoothClassic.getConnectedDevice(address);
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
    disconnectListener = RNBluetoothClassic.onDeviceDisconnected(() => {
      callback();
      setIsConnected(false);
    });
  };

  return {
    pairedDeviceList,
    getPairedDevices,
    scanDeviceList,
    getScanDevices,
    connect,
    connectedDevice,
    isConnected,
    setIsConnected,
    write,
    readMessage,
    disconnect,
    findConnectedDeviceByAddress,
    plotDataStreamStart,
    onStreamDataReceive,
    onDisconnect,
  };
}
