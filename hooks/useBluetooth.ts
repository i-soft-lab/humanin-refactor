import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {useState} from 'react';
import showToast from '../components/Toast';

export default function useBluetooth() {
  //UI 관련
  const [discovering, setDiscovering] = useState(false);

  const [pairedDeviceList, setPairedDeviceList] = useState<BluetoothDevice[]>(
    [],
  );
  const [scanDeviceList, setScanDeviceList] = useState<BluetoothDevice[]>([]);

  const getPairedDevices = async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices();
      setPairedDeviceList(paired);
    } catch (err: any) {
      showToast({
        type: 'error',
        message: '페어링된 디바이스 가져오기 실패',
        description: err?.message,
        autoHide: true,
      });
    }
  };

  const getScanDevices = async () => {
    try {
      setDiscovering(true);

      showToast({
        type: 'info',
        message: '장치를 검색중입니다. 잠시만 기다려주세요.',
        description: undefined,
        autoHide: false,
      });

      const unpaired = await RNBluetoothClassic.startDiscovery();
      const namedDeviceList = unpaired.filter(v => v.name !== v.address);
      setScanDeviceList(namedDeviceList);

      showToast({
        type: 'success',
        message: `${namedDeviceList.length}개의 장치를 발견했습니다.`,
        description: undefined,
        autoHide: true,
      });
    } catch (err: any) {
      showToast({
        type: 'error',
        message: '장치 검색 실패',
        description: err.message,
        autoHide: true,
      });
    } finally {
      setDiscovering(false);
    }
  };

  return {
    pairedDeviceList,
    getPairedDevices,
    scanDeviceList,
    getScanDevices,
  };
}
