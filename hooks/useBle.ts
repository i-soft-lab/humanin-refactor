import {BleManager, Device, DeviceId} from 'react-native-ble-plx';
import {useState} from 'react';

const SERVICE_UUID = '';
const CHARACTERRITIC_UUID = '';
export default function useBle() {
  const bleManager = new BleManager();
  const [scanDeviceList, setScanDeviceList] = useState<Device[]>([]);

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const getScanDevices = () => {
    setScanDeviceList([]);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        throw new Error('디바이스 스캔 오류 발생');
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

  const stopScan = () => {
    bleManager.stopDeviceScan();
  };

  const connect = async (id: DeviceId) => {
    const connection = await bleManager.connectToDevice(id);
    await connection.discoverAllServicesAndCharacteristics();
    bleManager.stopDeviceScan();
    return {deviceName: connection.name, deviceId: connection.id};
  };

  const write = async (id: DeviceId, data: string) => {
    await bleManager.writeCharacteristicWithoutResponseForDevice(
      id,
      SERVICE_UUID,
      CHARACTERRITIC_UUID,
      btoa(data),
    );
  };

  const readMessage = async (id: DeviceId) => {
    await bleManager.readCharacteristicForDevice(
      id,
      SERVICE_UUID,
      CHARACTERRITIC_UUID,
    );
  };

  return {
    getScanDevices,
    stopScan,
    connect,
    write,
    readMessage,
    scanDeviceList,
  };
}
