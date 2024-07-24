import { create } from 'zustand';
import {
  BleManager,
  Characteristic,
  Device,
  DeviceId,
} from 'react-native-ble-plx';

const base64Encode = (input: string): string => {
  const buffer = new TextEncoder().encode(input);
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

const SERVICE_UUID = process.env.SERVICE_UUID!;
const CHARACTERISTIC_UUID = process.env.CHARACTERISTIC_UUID!;

const SCAN_TIMEOUT = 10000;

const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
  devices.findIndex((device) => nextDevice.id === device.id) > -1;

const useBleStore = create<TBleState>((set, get) => ({
  bleManager: new BleManager(),
  scanDeviceList: [],
  isScan: false,
  connectStatus: {
    device: null,
    isError: false,
    isLoading: false,
  },
  addDevice: (device) =>
    set((state) => {
      if (isDuplicateDevice(state.scanDeviceList, device)) {
        return { scanDeviceList: state.scanDeviceList };
      }

      return { scanDeviceList: [...state.scanDeviceList, device] };
    }),
  clearDevices: () =>
    set({
      scanDeviceList: [],
    }),
  destroyManager: () => {
    get().bleManager.destroy();
  },
  stopScan: () => {
    set({ isScan: false });

    get().bleManager.stopDeviceScan();
  },
  startScan: async () => {
    const { bleManager, addDevice, clearDevices, stopScan } = get();

    clearDevices();
    set({ isScan: true });

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
      if (get().isScan) {
        stopScan();
      }
    }, SCAN_TIMEOUT);
  },
  findServicesAndCharacteristics: async (id: DeviceId) => {
    const device =
      await get().bleManager.discoverAllServicesAndCharacteristicsForDevice(id);
    const services = await device.services();
    return await Promise.all(
      services.map((service) => service.characteristics())
    );
  },
  connect: async (id: DeviceId) => {
    const { bleManager, isScan, stopScan } = get();

    isScan && stopScan();
    set({ connectStatus: { device: null, isLoading: true, isError: false } });

    await bleManager
      .connectToDevice(id)
      .then((device) =>
        set({ connectStatus: { device, isLoading: false, isError: false } })
      )
      .catch((e) =>
        set({
          connectStatus: { device: null, isLoading: false, isError: true },
        })
      );
  },
  disconnect: async (id: DeviceId) => {
    await get().bleManager.cancelDeviceConnection(id);
  },
  write: async (id: DeviceId, data: string) => {
    const encodedData = base64Encode(data);
    await get().bleManager.writeCharacteristicWithResponseForDevice(
      id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      encodedData
    );
  },
  isConnectedDevice: async (id: DeviceId) => {
    return get().bleManager.isDeviceConnected(id);
  },
  onDisconnect: (id: DeviceId, callback: () => void) => {
    get().bleManager.onDeviceDisconnected(id, () => {
      callback();
    });
  },
  subscribeCharacteristic: (
    id: DeviceId,
    callback: (dataArr: Characteristic | null) => void
  ) => {
    get().bleManager.monitorCharacteristicForDevice(
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
  },
}));

export { useBleStore };

type TBleConnectStatus = {
  device: Device | null;
  isError: boolean;
  isLoading: boolean;
};

type TBleState = {
  bleManager: BleManager;
  scanDeviceList: Device[];
  isScan: boolean;
  connectStatus: TBleConnectStatus;
  addDevice: (device: Device) => void;
  clearDevices: () => void;
  destroyManager: () => void;
  startScan: () => Promise<void>;
  stopScan: () => void;
  findServicesAndCharacteristics: (id: DeviceId) => Promise<Characteristic[][]>;
  connect: (id: DeviceId) => Promise<void>;
  disconnect: (id: DeviceId) => Promise<void>;
  write: (id: DeviceId, data: string) => Promise<void>;
  isConnectedDevice: (id: DeviceId) => Promise<boolean>;
  onDisconnect: (id: DeviceId, callback: () => void) => void;
  subscribeCharacteristic: (
    id: DeviceId,
    callback: (dataArr: Characteristic | null) => void
  ) => void;
};
