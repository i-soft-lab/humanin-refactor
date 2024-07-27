import { useAtom } from 'jotai/index';
import { Characteristic, Device, DeviceId } from 'react-native-ble-plx';
import {
  bleManagerAtom,
  connectStatusAtom,
  isScanAtom,
  scanDeviceListAtom,
} from '@/lib/atoms/sender-atom';

const SERVICE_UUID = process.env.SERVICE_UUID!;
const CHARACTERISTIC_UUID = process.env.CHARACTERISTIC_UUID!;

const SCAN_TIMEOUT = 10000;

const base64Encode = (input: string): string => {
  const buffer = new TextEncoder().encode(input);
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
  devices.findIndex((device) => nextDevice.id === device.id) > -1;

const useBle = () => {
  const [bleManager, setBleManager] = useAtom(bleManagerAtom);
  const [scanDeviceList, setScanDeviceList] = useAtom(scanDeviceListAtom);
  const [isScan, setIsScan] = useAtom(isScanAtom);
  const [connectStatus, setConnectStatus] = useAtom(connectStatusAtom);

  const addDevice = (device: Device) => {
    setScanDeviceList((devices) => {
      if (isDuplicateDevice(devices, device)) {
        return devices;
      }
      return [...devices, device];
    });
  };

  const clearDevices = () => {
    setScanDeviceList([]);
  };

  const destroyManager = () => {
    bleManager.destroy();
  };

  const stopScan = () => {
    setIsScan(false);
    bleManager.stopDeviceScan();
  };

  const startScan = async () => {
    clearDevices();
    setIsScan(true);

    await bleManager.startDeviceScan(
      null,
      { allowDuplicates: false },
      (error, device) => {
        if (error) {
          stopScan();
          return;
        }

        if (device && device.name !== null) {
          addDevice(device);
        }
      }
    );

    setTimeout(() => {
      if (isScan) {
        stopScan();
      }
    }, SCAN_TIMEOUT);
  };

  const findServicesAndCharacteristics = async (id: DeviceId) => {
    const device =
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(id);
    const services = await device.services();
    return await Promise.all(
      services.map((service) => service.characteristics())
    );
  };

  const connect = async (id: DeviceId) => {
    isScan && stopScan();
    setConnectStatus({ device: null, isLoading: true, isError: false });

    await bleManager
      .connectToDevice(id)
      .then((device) =>
        setConnectStatus({ device, isLoading: false, isError: false })
      )
      .catch(() =>
        setConnectStatus({ device: null, isLoading: false, isError: true })
      );
  };

  const disconnect = async (id: DeviceId) => {
    await bleManager.cancelDeviceConnection(id);
  };

  const write = async (id: DeviceId, data: string) => {
    const encodedData = base64Encode(data);
    await bleManager.writeCharacteristicWithResponseForDevice(
      id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      encodedData
    );
  };

  const isConnectedDevice = async (id: DeviceId) => {
    return bleManager.isDeviceConnected(id);
  };

  const onDisconnect = (id: DeviceId, callback: () => void) => {
    bleManager.onDeviceDisconnected(id, () => {
      callback();
    });
  };

  const subscribeCharacteristic = (
    id: DeviceId,
    callback: (dataArr: Characteristic | null) => void
  ) => {
    bleManager.monitorCharacteristicForDevice(
      id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          return;
        }
        callback(characteristic);
      }
    );
  };

  return {
    bleManager,
    scanDeviceList,
    isScan,
    connectStatus,
    addDevice,
    clearDevices,
    destroyManager,
    startScan,
    stopScan,
    findServicesAndCharacteristics,
    connect,
    disconnect,
    write,
    isConnectedDevice,
    onDisconnect,
    subscribeCharacteristic,
  };
};

export { useBle };
