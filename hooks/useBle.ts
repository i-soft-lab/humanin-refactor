import {
  BleManager,
  Characteristic,
  Device,
  DeviceId,
} from 'react-native-ble-plx';
import {useState} from 'react';
import base64 from 'react-native-base64';

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
    bleManager.startDeviceScan(
      null,
      {allowDuplicates: false},
      (error, device) => {
        if (error) {
          stopScan();
        }

        if (device && device.name !== null) {
          setScanDeviceList(prevState => {
            if (!isDuplicateDevice(prevState, device)) {
              console.log(device);
              return [...prevState, device];
            }
            return prevState;
          });
        }
      },
    );
  };

  const findServicesAndCharacteristics = async (id: DeviceId) => {
    return await bleManager
      .discoverAllServicesAndCharacteristicsForDevice(id)
      .then(device => {
        return device.services();
      })
      .then(services =>
        services.map(async service => await service.characteristics()),
      )
      .then(async characteristics => await Promise.all(characteristics));
  };

  const connect = async (id: DeviceId) => {
    stopScan();
    return bleManager.connectToDevice(id);
  };

  const disconnect = async (id: DeviceId) => {
    await bleManager.cancelDeviceConnection(id);
  };

  const write = async (id: DeviceId, data: string) => {
    await bleManager.writeCharacteristicWithResponseForDevice(
      id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      base64.encode(data),
    );
  };

  const isConnectedDevice = async (id: DeviceId) => {
    return await bleManager.isDeviceConnected(id);
  };

  const onDisconnect = (id: DeviceId, callback: () => void) => {
    bleManager.onDeviceDisconnected(id, () => {
      callback();
    });
  };

  const subscribeCharacteristic = (
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
        callback(characteristic);
      },
    );
  };

  return {
    destroyManager,
    getScanDevices,
    findServicesAndCharacteristics,
    stopScan,
    connect,
    disconnect,
    write,
    isConnectedDevice,
    onDisconnect,
    subscribeCharacteristic,
    scanDeviceList,
  };
}
