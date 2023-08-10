import {
  BleManager,
  Characteristic,
  Device,
  DeviceId,
} from 'react-native-ble-plx';
import {useState} from 'react';

const SERVICE_UUID = process.env.SERVICE_UUID!;
const CHARACTERISTIC_UUID = process.env.CHARACTERISTIC_UUID!;
export default function useBle(bleManager: BleManager) {
  const [scanDeviceList, setScanDeviceList] = useState<Device[]>([]);

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const destroyManager = () => {
    bleManager.destroy();
  };

  const stopScan = () => {
    bleManager.stopDeviceScan();
  };

  const getScanDevices = () => {
    setScanDeviceList([]);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        stopScan();
      }

      if (device && device.name !== null) {
        setScanDeviceList(prevState => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  const connect = async (id: DeviceId) => {
    stopScan();
    return await bleManager
      .connectToDevice(id)
      .then(async connection =>
        (await bleManager.isDeviceConnected(id))
          ? {deviceName: connection.name!, deviceId: connection.id}
          : null,
      );
  };

  const disconnect = async (id: DeviceId) => {
    await bleManager.cancelDeviceConnection(id);
  };

  const write = async (id: DeviceId, data: string) => {
    await bleManager.writeCharacteristicWithoutResponseForDevice(
      id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      btoa(data),
    );
  };

  const readMessage = async (id: DeviceId) => {
    await bleManager.readCharacteristicForDevice(
      id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
    );
  };

  const plotDataStreamStart = async (id: DeviceId) => {
    await write(id, 'plot').then(async () => await readMessage(id));
  };

  const isConnectedDevice = async (id: DeviceId) => {
    return await bleManager.isDeviceConnected(id);
  };

  const onDisconnect = (id: DeviceId, callback: () => void) => {
    bleManager.onDeviceDisconnected(id, () => {
      callback();
    });
  };

  const onStreamDataReceive = (
    id: DeviceId,
    callback: (dataArr: Characteristic | null) => void,
  ) => {
    bleManager.monitorCharacteristicForDevice(
      id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          return error;
        }
        console.log(characteristic);
        callback(characteristic);
      },
    );
  };

  return {
    destroyManager,
    getScanDevices,
    stopScan,
    connect,
    disconnect,
    write,
    readMessage,
    plotDataStreamStart,
    isConnectedDevice,
    onDisconnect,
    onStreamDataReceive,
    scanDeviceList,
  };
}
